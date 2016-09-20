'use strict';
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];
const fourth = process.argv[3];
const fifth = process.argv[4];
const sixth = process.argv[5];
const seventh = process.argv[6];
if (cmd === 'read') {
 fs.readFile(petsPath, 'utf8', (err, data) => {
   if (err) throw err;
   const pets = JSON.parse(data);
   if (Number.isNaN(fourth)) {
       console.log(pets);
       process.exit();
   }
   if (fourth >= pets.length || fourth < 0){
     console.error(`Usage: ${node} ${file} read INDEX`);
     process.exit(1);
   }
   else if (!fourth){
     console.log(pets);
   } else {
   console.log(pets[fourth]);
 }
 });
} else if (cmd === 'create' || cmd === 'update') {
 fs.readFile(petsPath, 'utf8', (readErr, data) => {
   if (readErr) throw readErr;
   const pets = JSON.parse(data);
   if (!fourth || !fifth || !sixth || isNaN(fourth) || !seventh) {
     if (cmd === 'create'){
     console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
   } else if (cmd === 'update'){
     console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
   }
     process.exit(1);
   }
   if (cmd === 'create'){
     var newPet = {};
       newPet.age = Number(fourth);
       newPet.kind = fifth;
       newPet.name = sixth;
       pets.push(newPet);
 } else if (cmd === 'update'){
     var newPet = {};
     newPet.age = Number(fifth);
     newPet.kind = sixth;
     newPet.name = seventh;
     pets[Number(fourth)] = newPet;
 }
   const petsJSON = JSON.stringify(pets);
   fs.writeFile(petsPath, petsJSON, (writeErr) => {
     if (writeErr) throw writeErr;
   });console.log(newPet);
 });
} else {
 console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
 process.exit(1);
}
