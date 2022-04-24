import axios from "axios";
import { API_URL } from "./constants";
import { QueryClient, useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";

axios.defaults.withCredentials = true;

export const queryClient = new QueryClient();

export const checkAuth = async () => {
  const res = await axios.get(`${API_URL}/auth/current-session`);
  return res.data;
};

export const projectsApi = async (user:number) => {
  const res = await axios.get(`${API_URL}/projects/user/${user}`);
  return res.data;
};

export const projectApi = async (user:number, id: string) => {
  const res = await axios.get(`${API_URL}/projects/user/${user}/project/${id}`);
  return res.data;
};

export const apiKeyAPI = async () => {
  const res = await axios.get(`${API_URL}/api/key`);
  return res.data;
}

export const apiSettingsApi = async () => {
  const res = await axios.get(`${API_URL}/api/settings`);
  return res.data;
}

type ProjectProps = {
  name: string;
  github_url: string;
  description: string;
  language: string;
  active: boolean;
}

const addProject = (project:ProjectProps) => {
  return axios.post(`${API_URL}/projects/new`, project);
};

export const useAddProject = () => {
  const toast = useToast();
  return useMutation(addProject, {
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error adding the upload",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};
 