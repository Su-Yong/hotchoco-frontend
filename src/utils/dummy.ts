const NAMES = [
  'Peter Brimer',
  'Tera Gaona',
  'Kandy Liston',
  'Lonna Wrede',
  'Kristie Yard',
  'Raul Host',
  'Yukiko Binger',
  'Velvet Natera',
  'Donette Ponton',
  'Loraine Grim',
  'Shyla Mable',
  'Marhta Sing',
  'Alene Munden',
  'Holley Pagel',
  'Randell Tolman',
  'Wilfred Juneau',
  'Naida Madson',
  'Marine Amison',
  'Glinda Palazzo',
  'Lupe Island',
  'Cordelia Trotta',
  'Samara Berrier',
  'Era Stepp',
  'Malka Spradlin',
  'Edward Haner',
  'Clemencia Feather',
  'Loretta Rasnake',
  'Dana Hasbrouck',
  'Sanda Nery',
  'Soo Reiling',
  'Apolonia Volk',
  'Liliana Cacho',
  'Angel Couchman',
  'Yvonne Adam',
  'Jonas Curci',
  'Tran Cesar',
  'Buddy Panos',
  'Rosita Ells',
  'Rosalind Tavares',
  'Renae Keehn',
  'Deandrea Bester',
  'Kelvin Lemmon',
  'Guadalupe Mccullar',
  'Zelma Mayers',
  'Laurel Stcyr',
  'Edyth Everette',
  'Marylin Shevlin',
  'Hsiu Blackwelder',
  'Mark Ferguson',
  'Winford Noggle',
  'Shizuko Gilchrist',
  'Roslyn Cress',
  'Nilsa Lesniak',
  'Agustin Grant',
  'Earlie Jester',
  'Libby Daigle',
  'Shanna Maloy',
  'Brendan Wilken',
  'Windy Knittel',
  'Alice Curren',
  'Eden Lumsden',
  'Klara Morfin',
  'Sherryl Noack',
  'Gala Munsey',
  'Stephani Frew',
  'Twana Anthony',
  'Mauro Matlock',
  'Claudie Meisner',
  'Adrienne Petrarca',
  'Pearlene Shurtleff',
  'Rachelle Piro',
  'Louis Cocco',
  'Susann Mcsweeney',
  'Mandi Kempker',
  'Ola Moller',
  'Leif Mcgahan',
  'Tisha Wurster',
  'Hector Pinkett',
  'Benita Jemison',
  'Kaley Findley',
  'Jim Torkelson',
  'Freda Okafor',
  'Rafaela Markert',
  'Stasia Carwile',
  'Evia Kahler',
  'Rocky Almon',
  'Sonja Beals',
  'Dee Fomby',
  'Damon Eatman',
  'Alma Grieve',
  'Linsey Bollig',
  'Stefan Cloninger',
  'Giovanna Blind',
  'Myrtis Remy',
  'Marguerita Dostal',
  'Junior Baranowski',
  'Allene Seto',
  'Margery Caves',
  'Nelly Moudy',
  'Felix Sailer',
];
const SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Phasellus vulputate odio commodo tortor sodales, et vehicula ipsum viverra.',
  'In et mollis velit, accumsan volutpat libero.',
  'Nulla rutrum tellus ipsum, eget fermentum sem dictum quis.',
  'Suspendisse eget vehicula elit.',
  'Proin ut lacus lacus.',
  'Aliquam erat volutpat.',
  'Vivamus ac suscipit est, et elementum lectus.',
  'Cras tincidunt nisi in urna molestie varius.',
  'Integer in magna eu nibh imperdiet tristique.',
  'Curabitur eu pellentesque nisl.',
  'Etiam non consequat est.',
  'Duis mi massa, feugiat nec molestie sit amet, suscipit et metus.',
  'Curabitur ac enim dictum arcu varius fermentum vel sodales dui.',
  'Ut tristique augue at congue molestie.',
  'Integer semper sem lorem, scelerisque suscipit lacus consequat nec.',
  'Etiam euismod efficitur magna nec dignissim.',
  'Morbi vel neque lectus.',
  'Etiam ac accumsan elit, et pharetra ex.',
  'Suspendisse vitae gravida mauris.',
  'Pellentesque sed laoreet erat.',
  'Nam aliquet purus quis massa eleifend, et efficitur felis aliquam.',
  'Fusce faucibus diam erat, sed consectetur urna auctor at.',
  'Praesent et nulla velit.',
  'Cras eget enim nec odio feugiat tristique eu quis ante.',
  'Morbi blandit diam vitae odio sollicitudin finibus.',
  'Integer ac ante fermentum, placerat orci vel, fermentum lacus.',
  'Maecenas est elit, semper ut posuere et, congue ut orci.',
  'Phasellus eget enim vitae nunc luctus sodales a eu erat.',
  'Curabitur dapibus nisi sed nisi dictum, in imperdiet urna posuere.',
  'Vivamus commodo odio metus, tincidunt facilisis augue dictum quis.',
  'Curabitur sagittis a lectus ac sodales.',
  'Nam eget eros purus.',
  'Nam scelerisque et ante in porta.',
  'Proin vitae augue tristique, malesuada nisl ut, fermentum nisl.',
  'Nulla bibendum quam id velit blandit dictum.',
  'Cras tempus ac dolor ut convallis.',
  'Sed vel ipsum est.',
  'Nulla ut leo vestibulum, ultricies sapien ac, pellentesque dolor.',
  'Etiam ultricies maximus tempus.',
  'Donec dignissim mi ac libero feugiat, vitae lacinia odio viverra.',
  'Curabitur condimentum tellus sit amet neque posuere, condimentum tempus purus eleifend.',
  'Donec tempus, augue id hendrerit pretium, mauris leo congue nulla, ac iaculis erat nunc in dolor.',
  'Praesent vel lectus venenatis, elementum mauris vitae, ullamcorper nulla.',
  'Maecenas non diam cursus, imperdiet massa eget, pellentesque ex.',
  'Vestibulum luctus risus vel augue auctor blandit.',
  'Nullam augue diam, pulvinar sed sapien et, hendrerit venenatis risus.',
  'Quisque sollicitudin nulla nec tellus feugiat hendrerit.',
  'Vestibulum a eros accumsan, lacinia eros non, pretium diam.',
  'Aenean iaculis augue sit amet scelerisque aliquam.',
  'Donec ornare felis et dui hendrerit, eget bibendum nibh interdum.',
  'Maecenas tellus magna, tristique vitae orci vel, auctor tincidunt nisi.',
  'Fusce non libero quis velit porttitor maximus at eget enim.',
  'Sed in aliquet tellus.',
  'Etiam a tortor erat.',
  'Donec nec diam vel tellus egestas lobortis.',
  'Vivamus dictum erat nulla, sit amet accumsan dolor scelerisque eu.',
  'In nec eleifend ex, pellentesque dapibus sapien.',
  'Duis a mollis nisi.',
  `
  LOREM IPSUM FONT GENERATOR IMAGES PLUGINS GENERATORS ENGLISH Lorem Ipsum Generator Generate Lorem Ipsum placeholder text. Select the number of
  characters, words, sentences or paragraphs, and hit generate! GENERATED LOREM IPSUM 5 PARAGRAPHS COPY Lorem ipsum dolor sit amet, consectetur
  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor rhoncus dolor purus non. Et malesuada fames ac
  turpis egestas integer eget aliquet. Aliquet enim tortor at auctor. Blandit libero volutpat sed cras ornare arcu dui. Nulla pellentesque dignissim
  enim sit amet. Augue mauris augue neque gravida in fermentum et sollicitudin. Feugiat pretium nibh ipsum consequat. Leo integer malesuada nunc vel
  risus. Morbi tempus iaculis urna id volutpat lacus laoreet non. At erat pellentesque adipiscing commodo elit. Pharetra vel turpis nunc eget lorem
  dolor sed. Non nisi est sit amet facilisis magna etiam tempor. Arcu cursus vitae congue mauris rhoncus aenean vel. Eget mi proin sed libero enim.
  Mattis molestie a iaculis at erat pellentesque. Placerat in egestas erat imperdiet sed. Laoreet suspendisse interdum consectetur libero id
  faucibus. Enim ut tellus elementum sagittis vitae et. Sollicitudin ac orci phasellus egestas tellus rutrum. In iaculis nunc sed augue lacus
  viverra vitae congue. Eget duis at tellus at urna condimentum mattis. Nunc consequat interdum varius sit amet. Sollicitudin tempor id eu nisl nunc
  mi ipsum. Elit eget gravida cum sociis natoque penatibus et magnis dis. Nibh praesent tristique magna sit amet purus. Sit amet dictum sit amet
  justo. Arcu vitae elementum curabitur vitae nunc sed. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Erat pellentesque
  adipiscing commodo elit. Dolor purus non enim praesent elementum facilisis leo vel fringilla. Pulvinar sapien et ligula ullamcorper malesuada
  proin libero. Euismod elementum nisi quis eleifend. Ut enim blandit volutpat maecenas. Purus ut faucibus pulvinar elementum integer enim neque
  volutpat ac. Proin nibh nisl condimentum id venenatis a condimentum. Et magnis dis parturient montes nascetur ridiculus mus. Pellentesque elit
  eget gravida cum sociis. Est lorem ipsum dolor sit. Id eu nisl nunc mi. Tincidunt arcu non sodales neque sodales ut. Nullam vehicula ipsum a arcu
  cursus. Fusce id velit ut tortor pretium viverra suspendisse potenti. Diam sit amet nisl suscipit adipiscing bibendum. Eu consequat ac felis
  donec. Interdum velit euismod in pellentesque massa placerat duis. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Vivamus at augue
  eget arcu dictum. Maecenas ultricies mi eget mauris pharetra et ultrices neque. Nunc scelerisque viverra mauris in aliquam. In cursus turpis massa
  tincidunt dui ut ornare. Bibendum ut tristique et egestas quis. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Mauris commodo
  quis imperdiet massa tincidunt. Pharetra magna ac placerat vestibulum lectus mauris ultrices. Vitae suscipit tellus mauris a diam maecenas sed
  enim ut. At erat pellentesque adipiscing commodo elit. Id aliquet risus feugiat in ante metus dictum at tempor. Tortor at auctor urna nunc id
  cursus. Mauris vitae ultricies leo integer malesuada. Senectus et netus et malesuada fames ac. Tincidunt tortor aliquam nulla facilisi cras
  fermentum. Sem nulla pharetra diam sit. Diam donec adipiscing tristique risus nec feugiat in fermentum. Felis eget velit aliquet sagittis id
  consectetur purus ut. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. At auctor urna nunc id cursus metus. Est lorem ipsum
  dolor sit. Mi eget mauris pharetra et ultrices neque ornare. In pellentesque massa placerat duis. Dictum varius duis at consectetur lorem donec
  massa sapien faucibus. © 2015 — 2021 PRIVACY POLICY SITEMAP FONT GENERATOR IMAGES PLUGINS GENERATORS SHARE THE LOREM WA SAI`,
  'Sed eget mauris condimentum, molestie justo eu, feugiat felis.',
  'Nunc suscipit leo non dui blandit, ac malesuada ex consequat.',
  'Morbi varius placerat congue.',
  'Praesent id velit in nunc elementum aliquet.',
  'Sed luctus justo vitae nibh bibendum blandit.',
  'Sed et sapien turpis.',
  'Nulla ac eros vestibulum, mollis ante eu, rutrum nulla.',
  'Sed cursus magna ut vehicula rutrum.',
  'Ut consectetur feugiat consectetur.',
  'Nulla nec ligula posuere neque sollicitudin rutrum a a dui.',
  'Nulla ut quam odio.',
  'Integer dignissim sapien et orci sodales volutpat.',
  'Nullam a sapien leo.',
  'Praesent cursus semper purus, vitae gravida risus dapibus mattis.',
  'Sed pellentesque nulla lorem, in commodo arcu feugiat sed.',
  'Phasellus blandit arcu non diam varius ornare.',
];

const users = NAMES.filter((it) => NAMES.findIndex((target) => target === it));

const repeat = <T extends unknown>(arr: T[], times: number): T[] => {
  let result: T[] = [];

  for (let i = 0; i < times; i++) {
    result = result.concat(arr);
  }

  return result;
};

const data = {
  users: repeat(users, 100),
  data: repeat(SENTENCES, 100),
};

console.log('data length', data.data.length);

export default data;
