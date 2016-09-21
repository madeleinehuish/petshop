else if (req.method === 'GET' && req.url === '/pets/0'){
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      } else {
        const pets = JSON.parse(petsJSON);
        const petJSON = JSON.stringify(pets[0]);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(petJSON);
      }
    });
  }
