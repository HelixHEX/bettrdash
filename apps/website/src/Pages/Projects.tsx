import React, { useEffect, useState } from "react";
import ProjectCard from "../Components/ProjectCard";
import {
  Flex,
  HStack,
  Grid,
  Button,
  useDisclosure,
  Text,
  Input,
  Textarea,
  Switch,
  Select,
  useToast,
  GridItem,
  Center,
  Stack,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  useColorModeValue,
  Tfoot,
} from "@chakra-ui/react";
import ModalComp from "../Components/ModalComp";
import { projectsApi, useAddProject } from "../api";
import { useQuery } from "react-query";
import { ProjectProps } from "../utils/types";
import Loading from "../Components/Loading";
import { FiGrid, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [filter, setFilter] = useState<string>("name");
  const [display, setDisplay] = useState<string>("grid");
  const { data: projectsData, status: projectsStatus } = useQuery(
    ["projects", filter],
    () => projectsApi({ filter })
  );

  if (projectsStatus === "loading") {
    return (
      <>
        <Flex flexDir={"column"} w="100%" h="100%">
          <Header
            setDisplay={setDisplay}
            display={display}
            filter={filter}
            setFilter={setFilter}
          />
          <Center w="100%" h="100%">
            <Loading />
          </Center>
        </Flex>
      </>
    );
  }

  if (projectsStatus === "error") {
    return <Text>An error has occurred</Text>;
  }

  if (projectsData.message) {
    return <Text>{projectsData.message}</Text>;
  }

  const projects = projectsData.projects;
  return (
    <>
      <Header
        setDisplay={setDisplay}
        display={display}
        filter={filter}
        setFilter={setFilter}
      />
      {display === "grid" ? (
        <GridView projects={projects} />
      ) : (
        <ListView projects={projects} />
      )}
    </>
  );
};

const Header = ({
  filter,
  setFilter,
  display,
  setDisplay,
}: {
  filter: string;
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    <>
      <Stack direction={{ base: "column", md: "row" }}>
        <NewProject />
        <HStack w="100%" justify="space-between">
          <Flex>
            <IconButton
              onClick={() => setDisplay("grid")}
              color={display === "grid" ? "pink.400" : ""}
              bg={display === "grid" ? bg : "none"}
              _hover={{ bg }}
              aria-label="Grid"
              icon={<FiGrid size={20} />}
            />
            <IconButton
              onClick={() => setDisplay("list")}
              color={display === "list" ? "pink.400" : ""}
              bg={display === "list" ? bg : "none"}
              ml={1}
              _hover={{ bg }}
              aria-label="List"
              icon={<FiList size={20} />}
            />
          </Flex>
          <Flex alignSelf={{ base: "center", md: "start" }}>
            <Text alignSelf={"center"}>Sort by: </Text>
            <Select
              value={filter}
              ml={2}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              size="sm"
              variant="filled"
              w={170}
            >
              <option value="name">Name</option>
              <option value="active">Active</option>
              <option value="status">Status</option>
            </Select>
          </Flex>
        </HStack>
      </Stack>
    </>
  );
};

const NewProject = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [live_url, setLiveURL] = useState("");
  const [github_url, setGithubUrl] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);
  const [image_url, setImageUrl] = useState("");
  const toast = useToast();

  const {
    mutate: addUpload,
    isSuccess,
    data: res,
    isError,
    isLoading,
  } = useAddProject();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "There was an error adding the upload",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (isSuccess && !isLoading) {
      if (res.data.success) {
        toast({
          title: "Success",
          description: "Project created!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: res.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [
    isLoading,
    isSuccess,
    isError,
    toast,
    res?.data.success,
    res?.data.message,
  ]);

  const addProject = () => {
    if (!name || !description || !language) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      addUpload({
        name,
        description,
        github_url,
        language,
        active,
        live_url,
        image_url,
      });
      onClose();
      setName("");
      setGithubUrl("");
      setLanguage("");
      setDescription("");
      setActive(false);
    }
  };
  return (
    <>
      <Button
        mb={{ base: 5, md: 0 }}
        _hover={{ color: "gray.800", bg: "gray.200" }}
        color="white"
        bgGradient={"linear(to-r, red.400,pink.400)"}
        onClick={onOpen}
      >
        New Project
      </Button>
      <ModalComp
        title={"New Project"}
        actionText="Add Project"
        isOpen={isOpen}
        onClose={onClose}
        onAction={addProject}
      >
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant={"flushed"}
          placeholder="Project Title"
        />
        <Input
          name="live_url"
          value={live_url}
          onChange={(e) => setLiveURL(e.target.value)}
          mt={5}
          variant={"flushed"}
          placeholder="Live Link"
        />
        <Input
          name="github_url"
          value={github_url}
          onChange={(e) => setGithubUrl(e.target.value)}
          mt={5}
          variant={"flushed"}
          placeholder="Github URL"
        />
        <Input
          name="image_url"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          mt={5}
          variant={"flushed"}
          placeholder="Image URL"
        />
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Select language"
          mt={5}
        >
          <option>Javascript</option>
          <option>Python</option>
          <option>Ruby on Rails</option>
          <option>HTML</option>
          <option>Java</option>
          <option>C++</option>
          <option>C</option>
          <option>C#</option>
        </Select>
        <Textarea
          name={"description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mt={5}
          placeholder="Description"
        />
        <HStack mt={5}>
          <Text fontSize={20} fontWeight={"200"}>
            Active?
          </Text>
          <Switch
            isChecked={active}
            onChange={() => setActive(!active)}
            colorScheme={"green"}
          />
        </HStack>
      </ModalComp>
    </>
  );
};

const GridView = ({ projects }: { projects: any }) => {
  return (
    <>
      <Grid
        w="100%"
        templateColumns="repeat(auto-fit, minmax(280px, 1fr))"
        autoRows={"inherit"}
        gap={20}
        mt={55}
      >
        {projects.map((project: ProjectProps, index: number) => (
          <GridItem key={index}>
            <Center>
              <ProjectCard project={project} />
            </Center>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

const ListView = ({ projects }: { projects: any }) => {
  const tableBg = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Table mt={10} rounded={5} bg={tableBg} boxShadow={"lg"} variant="simple">
        <Thead>
          <Tr>
            <Th>Project</Th>
            <Th>Description</Th>
            <Th>Active</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project: ProjectProps, index: number) => (
            <Tr
              onClick={() => navigate(`/projects/${project.id}`)}
              _hover={{ cursor: "pointer", bg: hoverBg }}
              key={index}
            >
              <Td>
                <HStack>
                  <Avatar size={"sm"} src={project.image_url} />
                  <Text>{project.name}</Text>
                </HStack>
              </Td>
              <Td>{project.description}</Td>
              <Td>{project.active ? "Yes" : "No"}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Project</Th>
            <Th>Description</Th>
            <Th>Active</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};

export default Projects;
