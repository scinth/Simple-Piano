var notes, keys;

const playNote = function (note) {
	note.currentTime = 0;
	note.play();
};

document.addEventListener('DOMContentLoaded', function () {
	notes = document.querySelectorAll('audio');
	keys = document.querySelectorAll('.keys div');

	let keyset = document.getElementsByClassName('keys')[0];
	keyset.addEventListener('mousedown', function (e) {
		let index = Number(e.target.dataset.key_index);
		playNote(notes[index]);
		keys[index].classList.add('active');
		e.stopPropagation();
	});
	keyset.addEventListener('mouseup', function (e) {
		let index = Number(e.target.dataset.key_index);
		keys[index].classList.remove('active');
		e.stopPropagation();
	});
	updatePianoSize();
});

let keyboard = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm'];
document.addEventListener('keydown', function (e) {
	if (e.repeat) return;
	if (!keyboard.includes(e.key)) return;
	let index = keyboard.indexOf(e.key);
	playNote(notes[index]);
	keys[index].classList.add('active');
});
document.addEventListener('keyup', function (e) {
	let index = keyboard.indexOf(e.key);
	keys[index].classList.remove('active');
});

const updatePianoSize = function () {
	let width = window.innerWidth * 0.9;
	if (width > 800) width = 800;
	else if (width < 400) width = 400;
	document.documentElement.style.setProperty('--piano-width', `${width}px`);
};

window.onresize = updatePianoSize;
