import { NhostClient } from "@nhost/nhost-js";

// const nhost = new NhostClient({
//   subdomain: 'dcfnsqxsycptsblstlnd',
//   region: 'eu-central-1'
// })

const nhost = new NhostClient({
  subdomain: "localhost",
  Encoding: "gzip, deflate",
});

export { nhost };
