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
export async function  saveManager(Prompt:Prompts){
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
