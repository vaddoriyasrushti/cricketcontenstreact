import baseService from './baseService';
export function Tournament(pageno,parpageRecord,sorting,filedName){
    return baseService.get('./api/tournament/'+pageno+'/'+parpageRecord+'/'+ filedName+'/'+sorting);
}
export function TournamentAdd(data){    
    return baseService.post('./api/tournament',data);
}
export function fetchSingleTournamentdata(id) {
    return baseService.get('./api/tournament/' + id);
}
export function UpdateTournamentdata(id,data){
    return baseService.put('./api/tournament/'+id,data);
}
export function AllTournamentData(pageno,parpageRecord,sorting,filedName){
    return baseService.get('./api/tournament/'+pageno+'/'+parpageRecord+'/'+ filedName+'/'+sorting);
}
export function TournamentData(){
    return baseService.get('./api/tournament');
}
export function DeleteTournament(id){
    return baseService.delete('./api/tournament/'+id);
}