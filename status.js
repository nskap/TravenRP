async function getStatus(){
  try{
    const res = await fetch('/server_status.php', {cache:'no-store'});
    const data = await res.json();

    const dot = document.getElementById('status-dot');
    const pc  = document.getElementById('players-count');
    const pm  = document.getElementById('players-max');
    const bar = document.getElementById('players-progress');
    const note= document.getElementById('status-note');

    if(!data || !('online' in data)){ throw new Error('Bad JSON'); }

    dot.classList.toggle('dot--online',  !!data.online);
    dot.classList.toggle('dot--offline', !data.online);

    const players = Number(data.players || 0);
    const max     = Number(data.max || 0);

    pc.textContent = players;
    pm.textContent = max;

    const perc = (max>0) ? Math.min(100, Math.round((players/max)*100)) : 0;
    bar.style.width = perc + '%';

    note.textContent = data.online ? 'Server je online.' : 'Server je offline.';
  }catch(e){
    console.error(e);
    document.getElementById('status-note').textContent = 'Nepodarilo sa načítať status.';
    document.getElementById('status-dot').classList.remove('dot--online');
    document.getElementById('status-dot').classList.add('dot--offline');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getStatus();
  setInterval(getStatus, 30000);
});
