import { isSignedIn } from "./auth.js";
import { gql } from "graphql-request";
window.onload = async () => {
  const check = await isSignedIn();

  if (check) renderPage();
  else window.location.href = "login.html";
};

const renderPage = async () => {
  const query = gql`
    query MyQuery {
      projects(order_by: { id: desc }) {
        id
        title
        description
        link
        winner
      }
    }
  `;
  const { data } = await nhost.graphql.request(query, { id: id });
  if (data.projects) {
    displayProjects(data.projects);
    displayWinner(data.projects);
  }
};

const displayProjects = (projects) => {
  const winner = getWinner(projects);

  projects.forEach((projects) => {
    const projectDiv = document.createElement("div");
    const projectDiv = createProjectNode(project);
    if (winner.length === 0) {
      const button = document.createElement("button");
      button.classList.add(
        "mt-2",
        "rounded",
        "bg-indigo-500",
        "text-white",
        "px-4",
        "py-2",
        "text-sm",
        "font-bold"
      );
      button.innerHTML = "Select Winner";
      button.addEventListener("click", () => updateWinner(project.id));
      projectDiv.append(button);
    }
    document.getElementById("projects").append(projectDiv);
  });

  console.log(getWinner);
};

const displayWinner = (projects) => {
  const winner = getWinner(projects);
  if (winner.length !== 0) {
    const winnerDiv = document.createElement(winner[0]);
    document.getElementById("winner").append(winnerDiv);
    document.getElementById("#winner > p").remove();
  }
};

const createProjectNode = (project) => {
  const div = document.createElement("div");
  div.classList.add("p-5", "shadow-md", "bg-white", "mt-4");
  div.innerHTML = `<h2 class="text-xl font-bold"> ${project.title}</h2>
        <p class="mt-2 text-sm">
        ${project.description}
        </p>
        <a href=${project.link} class="text-blue-700 text-sm mt-2 block"> View Project</a>       
        `;
  return div;
};
const getWinner = (projects) => {
  return project.filter((project) => project.winner === true);
};

const updateWinner = async (id) => {
  const query = gql`
    mutation MyMutation($id: Integer) {
      update_projects(where: { id: { _eq: $id } }, _set: { winner: true }) {
        affected_rows
      }
    }
  `;
  const { data } = await nhost.graphql.request(query, {});
  if (data.update_projects.affected_rows === 1) location.reload();
};
