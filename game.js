(() => {
  const canvas = document.querySelector('#game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const ui = {
    time: document.querySelector('#time'), echoCount: document.querySelector('#echoCount'), attempt: document.querySelector('#attempt'),
    hint: document.querySelector('#hint'), start: document.querySelector('#startOverlay'), death: document.querySelector('#deathOverlay'), win: document.querySelector('#winOverlay'),
    deathText: document.querySelector('#deathText'), winText: document.querySelector('#winText')
  };
  const walls = [
    {x:145,y:0,w:34,h:316}, {x:145,y:402,w:34,h:158}, {x:315,y:153,w:34,h:407}, {x:315,y:0,w:34,h:76},
    {x:490,y:0,w:34,h:348}, {x:490,y:425,w:34,h:135}, {x:665,y:120,w:34,h:440}, {x:665,y:0,w:34,h:54},
    {x:740,y:246,w:115,h:32}, {x:535,y:83,w:91,h:30}, {x:205,y:370,w:76,h:28}
  ];
  const exit = {x:838, y:472, r:27};
  const keys = new Set();
  let state = 'start', attempt = 0, timer = 60, last = 0, player, echoes = [], currentPath = [], deathPaths = [];

  function seedPath() {
    const arr = [];
    for (let i = 0; i < 95; i++) {
      const t = i / 94;
      arr.push({x:390 + Math.sin(t * 7) * 92 + t * 180, y:110 + t * 335 + Math.cos(t * 8) * 38});
    }
    return arr;
  }
  function reset() {
    attempt++; timer = 60; state = 'play'; currentPath = [];
    player = {x:65, y:495, r:11, dash:0, dashCooldown:0, trail:[]};
    const source = deathPaths.slice(-3);
    if (!source.length) source.push(seedPath());
    echoes = source.map((path, i) => makeEcho(path, i));
    ui.attempt.textContent = String(attempt).padStart(2, '0'); ui.echoCount.textContent = echoes.length;
    ui.start.classList.add('hidden'); ui.death.classList.add('hidden'); ui.win.classList.add('hidden');
    ui.hint.textContent = attempt === 1 ? '봇 Echo가 길목을 순찰합니다. 벽에 닿지 말고 출구로.' : 'Echo는 당신의 죽음을 변형했습니다. 궤적을 외워도 안전하지 않습니다.';
  }
  function makeEcho(path, index) {
    const at = path[Math.floor(Math.random() * Math.max(1, path.length - 15))] || path[0];
    return {path, cursor:(index * 31) % path.length, x:at.x, y:at.y, r:14 + index * 2, speed:1.05 + attempt * .07 + index * .08, phase:Math.random() * 10, color:index ? '#ff688c' : '#f08cff'};
  }
  function collides(x, y, r) { return walls.some(w => x + r > w.x && x - r < w.x + w.w && y + r > w.y && y - r < w.y + w.h); }
  function endDeath(reason) {
    state = 'dead'; deathPaths.push(currentPath.slice(-280));
    if (deathPaths.length > 5) deathPaths.shift();
    ui.deathText.textContent = `${reason} 사망 직전 ${Math.min(6, currentPath.length / 45).toFixed(1)}초의 움직임이 다음 판에 오염된 Echo로 남습니다.`;
    ui.death.classList.remove('hidden');
  }
  function win() {
    state = 'win';
    ui.winText.textContent = `${(60 - timer).toFixed(1)}초 만에 탈출 · 다음 시도에는 Echo ${echoes.length}개가 기다립니다.`;
    ui.win.classList.remove('hidden');
  }
  function update(dt) {
    if (state !== 'play') return;
    timer -= dt;
    if (timer <= 0) { endDeath('신호가 소멸했습니다.'); return; }
    let dx = (keys.has('arrowright') || keys.has('d') ? 1 : 0) - (keys.has('arrowleft') || keys.has('a') ? 1 : 0);
    let dy = (keys.has('arrowdown') || keys.has('s') ? 1 : 0) - (keys.has('arrowup') || keys.has('w') ? 1 : 0);
    if (dx || dy) { const n = Math.hypot(dx, dy); dx /= n; dy /= n; }
    player.dash = Math.max(0, player.dash - dt); player.dashCooldown = Math.max(0, player.dashCooldown - dt);
    const speed = (player.dash > 0 ? 460 : 190) * dt;
    const nx = player.x + dx * speed, ny = player.y + dy * speed;
    if (!collides(nx, player.y, player.r)) player.x = nx;
    if (!collides(player.x, ny, player.r)) player.y = ny;
    player.trail.push({x:player.x, y:player.y}); if (player.trail.length > 18) player.trail.shift();
    currentPath.push({x:player.x, y:player.y}); if (currentPath.length > 280) currentPath.shift();
    for (const e of echoes) {
      e.cursor = (e.cursor + e.speed * dt * 18) % e.path.length;
      const p = e.path[Math.floor(e.cursor)];
      e.x += (p.x + Math.sin(performance.now() / 310 + e.phase) * 26 + (player.x - e.x) * .18 - e.x) * Math.min(1, dt * 2.6);
      e.y += (p.y + Math.cos(performance.now() / 340 + e.phase) * 26 + (player.y - e.y) * .18 - e.y) * Math.min(1, dt * 2.6);
      if (Math.hypot(player.x - e.x, player.y - e.y) < player.r + e.r) { endDeath('오염된 과거의 자신에게 잡혔습니다.'); return; }
    }
    if (Math.hypot(player.x - exit.x, player.y - exit.y) < player.r + exit.r) win();
    ui.time.textContent = timer.toFixed(1);
  }
  function circle(x, y, r, color, blur = 0) {
    ctx.save(); ctx.shadowBlur = blur; ctx.shadowColor = color; ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  function draw() {
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#07131d'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#123345'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 35) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 35) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    const glow = ctx.createRadialGradient(exit.x, exit.y, 4, exit.x, exit.y, 90);
    glow.addColorStop(0, '#41ffbd66'); glow.addColorStop(1, '#41ffbd00'); ctx.fillStyle = glow; ctx.fillRect(exit.x - 90, exit.y - 90, 180, 180);
    ctx.strokeStyle = '#54ffc8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(exit.x, exit.y, exit.r, 0, Math.PI * 2); ctx.stroke(); ctx.font = '10px IBM Plex Mono'; ctx.fillStyle = '#a3f6d8'; ctx.textAlign = 'center'; ctx.fillText('EXIT', exit.x, exit.y + 4);
    walls.forEach(w => { ctx.fillStyle = '#102637'; ctx.fillRect(w.x, w.y, w.w, w.h); ctx.strokeStyle = '#275169'; ctx.strokeRect(w.x + .5, w.y + .5, w.w - 1, w.h - 1); });
    for (const e of echoes) {
      ctx.strokeStyle = e.color + '55'; ctx.lineWidth = 1; ctx.beginPath(); const start = Math.max(0, Math.floor(e.cursor) - 24);
      for (let j = start; j < Math.floor(e.cursor); j++) { const p = e.path[j % e.path.length]; if (j === start) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); } ctx.stroke();
      circle(e.x, e.y, e.r, e.color, 18); circle(e.x, e.y, 4, '#ffe9f1', 5);
    }
    if (player) {
      ctx.strokeStyle = '#4ce0ff66'; ctx.lineWidth = 3; ctx.beginPath(); player.trail.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke();
      circle(player.x, player.y, player.r, player.dash > 0 ? '#ffffff' : '#60e8ff', 22); circle(player.x, player.y, 4, '#d8fbff', 3);
    }
    if (state === 'play') { ctx.textAlign = 'left'; ctx.font = '11px IBM Plex Mono'; ctx.fillStyle = '#6995a9'; ctx.fillText(`DASH ${player.dashCooldown > 0 ? 'RECHARGING' : 'READY'}`, 18, 28); }
  }
  function loop(now) { const dt = Math.min(.033, (now - last) / 1000 || 0); last = now; update(dt); draw(); requestAnimationFrame(loop); }
  function dash() { if (state === 'play' && player.dashCooldown <= 0) { player.dash = .16; player.dashCooldown = 1; } }
  window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (['arrowup','arrowdown','arrowleft','arrowright',' ','w','a','s','d','r'].includes(key)) e.preventDefault();
    if (key === ' ') dash(); if (key === 'r') reset(); keys.add(key);
  });
  window.addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
  document.querySelector('#start').onclick = reset; document.querySelector('#retry').onclick = reset; document.querySelector('#next').onclick = reset; document.querySelector('#restart').onclick = reset;
  draw(); requestAnimationFrame(loop);
})();
