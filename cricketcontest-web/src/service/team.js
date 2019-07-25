import baseService from './baseService';

export function Team(pageno, parpageRecord, sorting, filedName) {
    return baseService.get('./api/team/' + pageno + '/' + parpageRecord + '/' + filedName + '/' + sorting);
}

export function TeamAdd(data) {
    return baseService.post('./api/team', data);
}
export function GetTeams() {
    return baseService.get('./api/team');
}
export function selectTeam(id) {

    return baseService.get(`./api/team/${id}`)
}
export function UpdateTeamdata(id, data) {
    return baseService.put('./api/team/' + id, data);
}
export function deleteTeamdata(id) {
    return baseService.delete('./api/team/' + id);
}