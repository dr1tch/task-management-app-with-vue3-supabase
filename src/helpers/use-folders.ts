import { ref } from "vue";
import { supabase } from "../lib/supabase-client";
import { Folder } from "../types/folders";

export const allFolders = ref<Folder[]>([]);

export async function getAllFolder() {
  try {
    let { data: folders, error } = await supabase.from("folders").select("*");
    console.log({ folders });
    if (error) {
      alert(error.message);
      console.error(error, error.message);
      return;
    }
    if (folders === null) {
      allFolders.value = [];
      return;
    }

    allFolders.value = folders;
  } catch (e) {
    console.error("Error while fetching folders", { e });
  }
}

export async function getFolderById(id: string | number) {
  try {
    let { data: folders, error } = await supabase
      .from("folders")
      .select(`*, todos (folder_id)`)
      .eq("id", id);

    if (error) {
      alert(error.message);
      console.error(error, error.message);
      return;
    }
    if (folders === null) {
      allFolders.value = [];
      return;
    }
    allFolders.value = folders;
  } catch (e) {
    console.error("Error while fetching folders", { e });
  }
}

export async function addFolder(folder: Folder): Promise<null | Folder> {
  try {
    const { data, error } = await supabase
      .from("todos")
      .insert(folder)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new folder");
    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

