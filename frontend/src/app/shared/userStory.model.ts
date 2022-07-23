export class userStory {
    fullName : string="";
    email : string="";
    uuid : string="";
    path: string="";
    dom: Date=new Date();
    constructor(fullName : string,
    email : string,
    uuid : string,
    path: string,
    dom: Date){
        this.fullName=fullName;
        this.email=email;
        this.uuid=uuid;
        this.path=path;
        this.dom=dom;
    }
}
