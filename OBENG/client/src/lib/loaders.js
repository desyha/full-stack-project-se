import { defer } from "react-router-dom"
import apiRequest from "./apiRequest"

export const singleBengkel = async ({request, params}) => {
    const res = await apiRequest("/bengkel/"+params.id)
    return res.data
}

export const listBengkel = async ({request, params}) => {
    const query = request.url.split("?")[1]
    const postPromise = apiRequest("/bengkel?"+query)
    return defer({
        postResponse: postPromise
      });
}

export const user = async ({request, params}) => {
    const res = await apiRequest("/users/search/"+params.id)
    return res.data
}

export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profileBengkel");
    return defer({
      postResponse: postPromise
    });
  };

