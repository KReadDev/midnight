import { registerPlugin } from "@capacitor/core";
import { DownloadData } from "../model/Download";

export interface DownloadPlugin {
    getAllDownloads(): Promise<{ downloads: DownloadData[] }>;
}

const DownloadPlugin = registerPlugin<DownloadPlugin>("Download");

export default DownloadPlugin;
