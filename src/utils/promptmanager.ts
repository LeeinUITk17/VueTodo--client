interface Prompts {
  id: string;
  name: string;
  language: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGEKEYS="Prompt";
import axios from 'axios';


export async function  saveManagerPs(Prompt:Prompts){
  try{
    await chrome.storage.local.set({[
        STORAGEKEYS
    ]: Prompt
});
console.log("Prompt saved",Prompt);

}catch(err){
    console.log(err);
  }
}

export async function getManager(){
  try{
    const { [STORAGEKEYS]: storedPrompts = [] } = await chrome.storage.local.get([STORAGEKEYS]);
    console.log("Prompt fetched",storedPrompts);
    return storedPrompts;
  }catch(err){
    console.log(err);
  }
}

export async function fetchAndSavePrompt() {
  try {
    const response = await axios.get('http://localhost:8000/prompt');
    await saveManagerPs(response.data);
    console.log("Data fetched and saved successfully");
  } catch (err) {
    console.error("Error fetching or saving data:", err);
  }
}

fetchAndSavePrompt();