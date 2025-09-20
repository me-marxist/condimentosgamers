// Simples feed local
const posts = [];

function postar() {
  const content = document.getElementById('postContent').value;
  if (!content) return;
  posts.unshift(content);
  renderFeed();
  document.getElementById('postContent').value = '';
}

function renderFeed() {
  const feedDiv = document.getElementById('feed');
  feedDiv.innerHTML = posts.map(p => `<p>${p}</p>`).join('');
}

// Autenticação fake
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('feed-section').style.display = 'block';
});

// Perfil fake
document.getElementById('profileForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('profileName').value;
  const picFile = document.getElementById('profilePic').files[0];
  const profileDiv = document.getElementById('profile');
  if (picFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profileDiv.innerHTML = `<h3>${name}</h3><img src="${e.target.result}" width="100">`;
    };
    reader.readAsDataURL(picFile);
  } else {
    profileDiv.innerHTML = `<h3>${name}</h3>`;
  }
});

// Chat (com backend PHP)
async function sendMessage() {
  const msg = document.getElementById('chatInput').value;
  if (!msg) return;
  await fetch('api/send_message.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'message=' + encodeURIComponent(msg)
  });
  document.getElementById('chatInput').value = '';
  loadMessages();
}

async function loadMessages() {
  const res = await fetch('api/fetch_messages.php');
  const msgs = await res.json();
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML = msgs.map(m => `<p>[${m.timestamp}] ${m.message}</p>`).join('');
  chatBox.scrollTop = chatBox.scrollHeight;
}

setInterval(loadMessages, 3000);
