import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  view: string;
  project: {
    id: number;
    name: string;
    language: string;
    description: string;
    github_url: string;
    active: boolean;
  };
};

const IMAGE =
  "https://res.cloudinary.com/practicaldev/image/fetch/s--qo_Wp38Z--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/e0nl7ziy1la7bpwj7rsp.png";

const ProjectCard = ({ project, view }: Props) => {
  const navigate = useNavigate()
  return (
    <>
      <Box
      _hover={{cursor: 'pointer'}}
        onClick={() => navigate(`/projects/${project.id}`)}
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "blue.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={useColorModeValue("green.400", "green.200")} fontSize={"sm"} textTransform={"uppercase"}>
            {project.active ? 'Active' : 'Inactive'}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {project.name}
          </Heading>
          <Text fontWeight={'200'}>{project.description}</Text>
        </Stack>
      </Box>
    </>
  );
};

export default ProjectCard;