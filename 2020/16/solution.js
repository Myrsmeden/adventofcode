const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const [rulesInfo, myTicketInfo, nearbyTicketsInfo] = input.split('\n\n');

const rules = rulesInfo.split('\n').reduce((acc, line) => {
  const intervals = line.split(': ')[1];
  const checkFunc = (input) => {
    return intervals.split(' or ').reduce((acc, interval) => {
      const numbers = interval.split('-').map((num) => parseInt(num));
      return acc || (numbers[0] <= input && input <= numbers[1]);
    }, false);
  };
  return [...acc, checkFunc];
}, []);

const rules2 = rulesInfo.split('\n').reduce((acc, line) => {
  const [fieldName, intervals] = line.split(': ');
  const checkFunc = (input) => {
    return intervals.split(' or ').reduce((acc, interval) => {
      const numbers = interval.split('-').map((num) => parseInt(num));

      const isValid = numbers[0] <= input && input <= numbers[1];

      if (!isValid) {
        return acc;
      }

      return [...acc, fieldName];
    }, []);
  };
  return [...acc, checkFunc];
}, []);

const nearbyTickets = nearbyTicketsInfo.split('\n').slice(1);

const part1 = () => {
  const inValidTickets = nearbyTickets.reduce((acc, ticket) => {
    return [
      ...acc,
      ...ticket
        .split(',')
        .map((num) => parseInt(num))
        .reduce((invalids, number) => {
          const isValid = rules.reduce((acc, rule) => acc || rule(number), false);

          if (isValid) {
            return invalids;
          } else {
            return [...invalids, number];
          }
        }, []),
    ];
  }, []);
  return inValidTickets.reduce((acc, ticket) => acc + ticket, 0);
};

// console.log(part1())

const part2 = () => {
  const validTickets = nearbyTickets.reduce((acc, ticket) => {
    if (
      ticket
        .split(',')
        .map((num) => parseInt(num))
        .reduce((valid, number) => {
          const isValid = rules.reduce((acc, rule) => acc || rule(number), false);

          return valid && isValid;
        }, true)
    ) {
      return [...acc, ticket];
    }
    return acc;
  }, []);

  const variants = validTickets.map((ticket) => {
    const ticketVariants = ticket
      .split(',')
      .map((num) => parseInt(num))
      .map((number) => {
        return rules2.reduce((acc, rule) => [...acc, ...rule(number)], []);
      });
    return ticketVariants;
  });
  const intersection = (set1, set2) => {
    return new Set([...set1].filter((x) => set2.has(x)));
  };
  const myTicket = myTicketInfo.split('\n')[1].split(',');

  let possibleSolutions = myTicket
    .map((number, index) => {
      return variants.reduce((acc, variant) => {
        if (!acc.size) {
          return new Set([...variant[index]]);
        }

        return intersection(acc, new Set([...variant[index]]));
      }, new Set());
    })
    .map((item) => [...item]);

  const solution = {};

  for (let i = 0; i < possibleSolutions.length; i++) {
    const determinableSolutionIndex = possibleSolutions.findIndex((list) => list.length === 1);
    if (determinableSolutionIndex > -1) {
      const value = possibleSolutions[determinableSolutionIndex][0];
      solution[determinableSolutionIndex] = value;
      possibleSolutions = possibleSolutions.map((item, index) => {
        if (index === determinableSolutionIndex) {
          return [];
        }

        return item.filter((x) => x !== value);
      });
    }
  }

  const filteredSolution = Object.entries(solution).reduce((acc, [index, value]) => {
    if (value.indexOf('departure') > -1) {
      return { ...acc, [index]: value };
    }

    return acc;
  }, {});
  return Object.keys(filteredSolution)
    .reduce((val, index) => {
      const ticketValue = parseInt(myTicket[parseInt(index)]);
      return [...val, ticketValue];
    }, [])
    .reduce((val, item) => val * item, 1);
};

console.log(part2());
// 800659997483 Too low
