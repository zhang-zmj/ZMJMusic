import mjRequest from "./index";

export function getTopMV(offset, limit = 10) {
  return mjRequest.get("/top/mv", {
    offset,
    limit
  })
}





