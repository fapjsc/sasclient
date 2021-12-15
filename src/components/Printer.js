// import { useEffect } from 'react';

// const Printer = () => {
//   let ports;

//   navigator.serial.addEventListener('connect', event => {
//     // TODO: Automatically open event.target or warn user a port is available.
//     console.log('connect');
//   });

//   navigator.serial.addEventListener('disconnect', event => {
//     // TODO: Remove |event.target| from the UI.
//     // If the serial port was opened, a stream error would be observed as well.
//     console.log('disconnect');
//   });

//   const reqPort = async () => {
//     ports = await navigator.serial.requestPort();
//   };

//   const getPorts = async () => {
//     ports = await navigator.serial.getPorts();
//     console.log(ports[0]);
//   };

//   const openPort = async () => {
//     await ports[0].open({ baudRate: 9600 });
//     console.log(ports);
//     const [appReadable, devReadable] = ports[0].readable.tee();
//     console.log(appReadable, devReadable);
//   };

//   const write = async () => {
//     const writer = ports[0].writable.getWriter();

//     const data = new Uint8Array([104, 101, 108, 108, 111]); // hello
//     await writer.write(data);

//     // Allow the serial port to be closed later.
//     writer.releaseLock();
//   };

//   const getSignal = async () => {
//     // Turn off Serial Break signal.
//     await ports[0].setSignals({ break: false });

//     // Turn on Data Terminal Ready (DTR) signal.
//     await ports[0].setSignals({ dataTerminalReady: true });

//     // Turn off Request To Send (RTS) signal.
//     await ports[0].setSignals({ requestToSend: false });

//     const signals = await ports[0].getSignals();
//     console.log(signals);
//     console.log(`Clear To Send:       ${signals.clearToSend}`);
//     console.log(`Data Carrier Detect: ${signals.dataCarrierDetect}`);
//     console.log(`Data Set Ready:      ${signals.dataSetReady}`);
//     console.log(`Ring Indicator:      ${signals.ringIndicator}`);
//   };

//   return (
//     <div>
//       <h1>Printer</h1>
//       <button onClick={reqPort}>req</button>
//       <button onClick={getPorts}>Get port</button>
//       <button onClick={openPort}>Open</button>
//       <button onClick={write}>write</button>
//       <button onClick={getSignal}>Signal</button>
//     </div>
//   );
// };

// export default Printer;
