const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });

const gamesData = input.split('\n');

const gameSettings = {
  red: 12,
  green: 13,
  blue: '14',
};

let sum = 0;

const partOne = () => {
  gamesData.forEach((gd) => {
    const [name, setsInput] = gd.split(': ');
    const id = parseInt(name.replace('Game ', ''));
    const sets = setsInput.split('; ');
    for (let i = 0; i < sets.length; i++) {
      const cubes = sets[i].split(', ');
      for (let j = 0; j < cubes.length; j++) {
        const [amount, color] = cubes[j].split(' ');
        if (parseInt(amount) > gameSettings[color]) {
          return false;
        }
      }
    }
    sum += id;
  });

  console.log('Part1', sum);
};

const partTwo = () => {
  const powers = gamesData.map((gd) => {
    const [name, setsInput] = gd.split(': ');
    const id = parseInt(name.replace('Game ', ''));
    const sets = setsInput.split('; ').reduce((acc, set) => {
      return [
        ...acc,
        ...set.split(', ').map((cube) => {
          const [amount, color] = cube.split(' ');
          return { [color]: parseInt(amount) };
        }),
      ];
    }, []);
    const reds = sets.filter((i) => i.red).map((i) => i.red);

    const greens = sets.filter((i) => i.green).map((i) => i.green);
    const blues = sets.filter((i) => i.blue).map((i) => i.blue);
    const maxReds = Math.max(...reds);
    const maxGreens = Math.max(...greens);

    const maxBlues = Math.max(...blues);

    console.log(id, maxReds, maxGreens, maxBlues);

    return maxReds * maxGreens * maxBlues;
  });

  console.log(powers.reduce((s, p) => s + p));
};

partOne();
partTwo();
