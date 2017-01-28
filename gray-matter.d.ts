declare module "gray-matter" {
    export interface GrayMatterOption{
    parser?:Function;
    eval?:boolean;
    lang?:string;
    delims:string;
    }
    export interface GrayMatter {
        (str:string,options:GrayMatterOption,delims:Array<string>,
        parser:Function):Object;
        read(fp:string,options:GrayMatterOption):Object;
        stringify(str:string,data:Object,options:GrayMatterOption):string;
    }

    var matter:GrayMatter;
    export default matter;
    
}


