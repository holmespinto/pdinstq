const defaultEvents = [
  {
      id: 1,
      title: 'Interview - Backend Engineer',
      start: new Date(),
      className: 'bg-success',
  },
  {
      id: 2,
      title: 'Phone Screen - Frontend Engineer',
      start: new Date().setDate(new Date().getDate() + 2),
      className: 'bg-info',
  },
  {
      id: 3,
      title: 'Meeting with John Deo',
      start: new Date().setDate(new Date().getDate() + 2),
      end: new Date().setDate(new Date().getDate() + 4),
      className: 'bg-warning',
  },
  {
      id: 4,
      title: 'Buy a Theme',
      start: new Date().setDate(new Date().getDate() + 4),
      end: new Date().setDate(new Date().getDate() + 5),
      className: 'bg-primary',
  },
];
const docentes = [
  {
      id: 1,
      name: 'Jose Antonio Polo',
      phone: '(461) 3636077',
      email: 'abreslau0@wiley.com',
      location: 'China',
      created_on: '7/4/2019',
      status: 'Active',
      avatar: 'https://robohash.org/laborevoluptateeaque.png?size=60x60&set=set1',
  },
  {
      id: 2,
      name: 'Docente',
      phone: '(917) 2590629',
      email: 'vtaber1@ucoz.com',
      location: 'Venezuela',
      created_on: '7/8/2019',
      status: 'Active',
      avatar: 'https://robohash.org/voluptatemeligendisint.png?size=60x60&set=set1',
  },
  {
      id: 3,
      name: 'Jose Martinez',
      phone: '(925) 9515307',
      email: 'lceeley2@fotki.com',
      location: 'Panama',
      created_on: '7/20/2019',
      status: 'Active',
      avatar: 'https://robohash.org/etidsapiente.png?size=60x60&set=set1',
  },
  {
      id: 4,
      name: 'Alfonzo Mejia',
      phone: '(295) 3668262',
      email: 'malfonzo3@irs.gov',
      location: 'France',
      created_on: '7/22/2019',
      status: 'Active',
      avatar: 'https://robohash.org/pariaturharumquas.png?size=60x60&set=set1',
  },
  {
      id: 5,
      name: 'Juan Pablo Hernandez',
      phone: '(809) 2120936',
      email: 'dtindley4@so-net.ne.jp',
      location: 'Colombia',
      created_on: '7/14/2019',
      status: 'Blocked',
      avatar: 'https://robohash.org/quodfugiatquae.png?size=60x60&set=set1',
  }
];




export { defaultEvents,docentes };
