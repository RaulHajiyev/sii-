 const input = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const listWrap = document.getElementById('listWrap');
    const clearInput = document.getElementById('clearInput');
    const sortBtn = document.getElementById('sortBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')||'[]');
    let sortAsc = true;

    function save(){localStorage.setItem('tasks', JSON.stringify(tasks))}

    function render(){
      
      const list = [...tasks];
      list.sort((a,b)=>{
        if(a.text.toLowerCase() < b.text.toLowerCase()) return sortAsc ? -1:1;
        if(a.text.toLowerCase() > b.text.toLowerCase()) return sortAsc ? 1:-1;
        return 0;
      });

      listWrap.innerHTML = '';
      if(list.length===0){
        listWrap.innerHTML = '<div style="padding:20px;color:var(--muted);text-align:center">No tasks yet</div>';
        return;
      }
 list.forEach((t, idx)=>{
        const row = document.createElement('div');
        row.className = 'task';

        const span = document.createElement('div');
        span.className = 'task-text';
        span.textContent = t.text;

        const del = document.createElement('button');
        del.className = 'delete-btn';
        del.title = 'Delete task';
        del.setAttribute('aria-label', 'Delete '+t.text);
        del.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

        del.addEventListener('click', ()=>{
          
          const realIndex = tasks.findIndex(x=>x.id===t.id);
          if(realIndex>-1){ tasks.splice(realIndex,1); save(); render(); }
        });

        row.appendChild(span);
        row.appendChild(del);
        listWrap.appendChild(row);
      });
    }
     function addTask(text){
      const trimmed = text.trim();
      if(!trimmed) return;
      tasks.push({id:Date.now()+Math.random(), text:trimmed});
      save(); render(); input.value=''; input.focus();
    }

    addBtn.addEventListener('click', ()=>{
  
  if(input.style.display === "none"){
    showInput();
  } 
  else {
    addTask(input.value);
    hideInput();
  }
});

    input.addEventListener('keydown', e=>{
  if(e.key==='Enter'){
    addTask(input.value);
    hideInput();   
  }
});
 clearInput.addEventListener('click', ()=>{ input.value=''; input.focus(); });

    sortBtn.addEventListener('click', ()=>{ sortAsc = !sortAsc; render(); sortBtn.style.opacity = sortAsc?0.95:0.6 });

    function hideInput(){
  input.style.display = "none";
  clearInput.style.display = "none";
}
function showInput(){
  input.style.display = "block";
  clearInput.style.display = "block";
  input.focus();
}

   
    render();

    
