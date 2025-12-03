export class StatusDownloadFile {
    constructor() {
        this.OpenProgressDownload = false;
        this.Complete = false;
    }

    NameFile: string;
    FileSize: string;
    OpenProgressDownload: boolean;
    ProgressDownload: number;
    StateDownload: string;
    Complete:boolean;

}