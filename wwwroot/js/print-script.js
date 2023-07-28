// Función para imprimir contenido en la impresora Bluetooth PT-210
async function printContent(content) {
  try {
      // Solicitar un dispositivo Bluetooth
      const device = await navigator.bluetooth.requestDevice({
          // Puedes configurar filtros para identificar la impresora Bluetooth específica
          filters: [{ name: 'MTP-2' }]
      });

      // Conectarse al servidor GATT del dispositivo Bluetooth
      const server = await device.gatt.connect();

      // Obtener el servicio GATT necesario para interactuar con la impresora
      const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');

      // Obtener la característica GATT necesaria para enviar datos de impresión
      const characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

      // Convertir el contenido a imprimir en un Uint8Array
      const encoder = new TextEncoder('utf-8');
      const data = encoder.encode(content);

      // Enviar los datos de impresión a la impresora
      await characteristic.writeValue(data);

      // Imprimir
      alert('¡Contenido enviado a la impresora!');

  } catch (error) {
      console.error('Error durante la impresión:', error);
      alert('Error durante la impresión. Consulta la consola para más detalles.');
  }
}
