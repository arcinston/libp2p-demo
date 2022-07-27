import { createLibp2p } from 'libp2p';
import { TCP } from '@libp2p/tcp';
import { Noise } from '@chainsafe/libp2p-noise';
import { Mplex } from '@libp2p/mplex';

const main = async () => {
  const tcpTransport = new TCP();
  const node = await createLibp2p({
    addresses: {
      // add a listen address (localhost) to accept TCP connections on a random port
      listen: ['/ip4/127.0.0.1/tcp/0'],
    },
    transports: [tcpTransport as any],
    connectionEncryption: [new Noise()],
    streamMuxers: [new Mplex() as any],
  });
  await node.start();
  console.log('started node');

  node.getMultiaddrs().forEach((addr) => console.log(addr.toString()));

  await node.stop();
  console.log('stopped node');
};
main(); // start the node
