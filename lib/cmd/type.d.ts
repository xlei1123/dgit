export interface PackageInfo {
    version: string;
    name: string;
}
export interface CommandInfo {
    dest?: string;
    owner?: string;
    repoName?: string;
    ref?: string;
    relativePath?: string;
    parallelLimit?: string;
    username?: string;
    password?: string;
    token?: string;
    exclude?: string;
    include?: string;
    log?: boolean;
    logPrefix?: string;
}
export interface DownloadPromptInfo {
    dest: string;
    owner: string;
    repoName: string;
    ref: string;
    relativePath: string;
    gitType: GitType;
}
export interface GitLinkInfo {
    owner: string;
    repoName: string;
    ref: string;
    relativePath: string;
    type: string;
}
export interface PasswordPromptInfo {
    password: string;
}
export declare type GitType = 'github' | 'gitee';
