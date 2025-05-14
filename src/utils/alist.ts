import axios from 'axios';

const base = 'https://files.inectar.cn'

export interface AlistFile {
    name: string
    size: number
    is_dir: boolean
    modified: Date
    created: Date
}

export async function getFileList(path: string): Promise<AlistFile[]> {
    const res = await axios.post(`${base}/api/fs/list`, {
        page: 1,
        password: "",
        path: path,
        per_page: 0,
        refresh: false
    })

    if(res.data.data === null || res.data.data.content === null){
        console.log("文件列表为空: " + path)
        console.log(res.data)
        return []
    }

    // 转换日期字段
    return res.data.data.content.map((item: any) => ({
        ...item,
        modified: new Date(item.modified),
        created: new Date(item.created)
    }))
}

export async function compileDownloadFileUrl(path: string, file:AlistFile): Promise<string>{
    const res = await axios.post(`${base}/api/fs/get`, {
        password: "",
        path: `${path}/${file.name}`
    })
    return res.data.data.raw_url;
}

export function compileFilePath(path: string, file:AlistFile): string{
    return `${base}${path}/${file.name}`;
}

export function compilePath(path: string): string{
    return `${base}${path}`;
}

export async function readAlistFile(path: string): Promise<any>{
    return (await axios.get(path)).data;
}