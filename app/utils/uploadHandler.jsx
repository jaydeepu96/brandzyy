import {
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

export const uploadHandler = unstable_createFileUploadHandler({
  directory: "public/uploads",
  maxFileSize: 1024 * 1024 * 10, // 10 MB
});

export async function parseMultipartFormData(request) {
  return await unstable_parseMultipartFormData(request, handler);
}
