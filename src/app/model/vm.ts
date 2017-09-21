export class Note{
    public Top: number;
    public Left: number;
    public Title: string;
    public Description: string;
    public Id: string;

    constructor(){
        this.Top = 0;
        this.Left = 0;
        this.Title = "New note"
        this.Description = "Description"
    }
    public DeSerialize(obj: any){
        this.Top = obj.Top;
        this.Left = obj.Left;
        this.Title = obj.Title;
        this.Description = obj.Description;
        this.Id = obj.Id;
    }
}