interface GrayMatterOption{
    parser?:Function;
    eval?:boolean;
    lang?:string;
    delims:string;
}
interface GrayMatter {
    (str:string,options:GrayMatterOption,delims:Array<string>,
    parser:Function):Object;
    read(fp:string,options:GrayMatterOption):Object;
    stringify(str:string,data:Object,options:GrayMatterOption):string;
}

declare module "gray-matter" {
    export = GrayMatter;
}