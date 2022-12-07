import { nhost } from "./nhost.js";
import { gql } from "graphql-request";

window.onload = async ()=> {
  
}

const form = document.getElementById("form");
const button = form.querySelector("button");
const submitForm = async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData.entries());

  button.innerHTML = "Processing...";
  const query = gql`
    mutation MyMutation($title: String, $description: String, $link: String) {
      insert_projects(
        objects: { description: $description, link: $link, title: $title }
      ) {
        affected_rows
      }
    }
  `;
  const { data, error } = await nhost.graphql.request(query, formDataObject);
  if (data.insert_projects.affected_rows == 1) displaySuccess();
  else displayError();
};

form.addEventListener("submit", submitForm);

const displaySuccess = () => {
  button.outerHTML =
    '<p class ="text-green-700"> Your project is submitted. Wait for the result </p>';
  form.reset();
};
const displayError = () => {
  alert("Something went wrong. Please try again later");
  button.innerHTML = "Submit Project";
};
