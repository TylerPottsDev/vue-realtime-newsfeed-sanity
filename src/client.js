import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "a5j1xfcn",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25"
});