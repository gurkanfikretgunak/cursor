#!/usr/bin/env node

const chalk = require('chalk');
const boxen = require('boxen');

const args = process.argv.slice(2);
const lang = (args.includes('-tr') || args.includes('--tr')) ? 'tr' : 'en';

const i18n = {
  en: {
    location: 'Turkey',
    about: {
      masterfabric: 'MasterFabric - AI-powered product development, education, open source first. Innovative mobile and web solutions with Flutter, BaaS platforms, and developer tools.',
      ticimax: 'Ticimax - One of Turkey\'s leading e-commerce platforms. 14,000+ companies. Omnichannel, B2B, marketplace integrations, 99.9% uptime cloud.'
    },
    labels: { name: 'Name', roles: 'Roles', company: 'Company', ossCompany: 'OSS Company', location: 'Location',
      aboutMasterfabric: 'About MasterFabric', aboutTicimax: 'About Ticimax', openSource: 'Open Source Development',
      keyRepos: 'Key Repositories', volunteer: 'Volunteer', skills: 'Skills', interests: 'Interests', contact: 'Contact',
      runOpensource: 'Run --opensource for details', runRepos: 'Run --repos for details', helpHint: 'Run with --help for more options' },
    skills: ['Flutter', 'Dart', 'Mobile Development', 'AI', 'Cloud (Azure, AWS)', 'Project Planning', 'High-Traffic Backend Architects', 'Team Leadership', 'Clean Architecture', 'State Management', 'CI/CD', 'RESTful APIs', 'Firebase', 'Git', 'Agile/Scrum'],
    interests: ['Mobile App Development', 'Flutter Ecosystem', 'Software Architecture', 'Team Leadership', 'Open Source', 'Innovative Solutions', 'Cross-platform Development']
  },
  tr: {
    location: 'Türkiye',
    about: {
      masterfabric: 'MasterFabric - AI destekli ürün geliştirme, eğitim, açık kaynak öncelikli. Flutter, BaaS platformları ve geliştirici araçları.',
      ticimax: 'Ticimax - Türkiye\'nin önde gelen e-ticaret platformlarından biri. 14.000+ şirket. Omnichannel, B2B, marketplace entegrasyonları.'
    },
    labels: { name: 'İsim', roles: 'Roller', company: 'Şirket', ossCompany: 'Açık Kaynak Şirketi', location: 'Konum',
      aboutMasterfabric: 'MasterFabric Hakkında', aboutTicimax: 'Ticimax Hakkında', openSource: 'Açık Kaynak Geliştirme',
      keyRepos: 'Ana Depolar', volunteer: 'Gönüllülük', skills: 'Yetenekler', interests: 'İlgi Alanları', contact: 'İletişim',
      runOpensource: 'Detaylar için --opensource', runRepos: 'Detaylar için --repos', helpHint: 'Daha fazla seçenek için --help' },
    skills: ['Flutter', 'Dart', 'Mobil Geliştirme', 'AI', 'Cloud (Azure, AWS)', 'Proje Planlama', 'Yüksek Trafikli Backend Mimarları', 'Takım Liderliği', 'Clean Architecture', 'State Management', 'CI/CD', 'RESTful APIs', 'Firebase', 'Git', 'Agile/Scrum'],
    interests: ['Mobil Uygulama Geliştirme', 'Flutter Ekosistemi', 'Yazılım Mimarisi', 'Takım Liderliği', 'Açık Kaynak', 'Yenilikçi Çözümler', 'Cross-platform Geliştirme']
  }
};

const t = i18n[lang];

const info = {
  name: 'Gurkan Fikret Gunak',
  role: 'Mobile Team Lead',
  roles: [
    'Ticimax Mobile Team Lead',
    'MasterFabric Open Sourced Development Lead'
  ],
  github: 'gurkanfikretgunak',
  githubUrl: 'https://github.com/gurkanfikretgunak',
  location: 'Türkiye',
  company: {
    name: 'Ticimax',
    website: 'https://ticimax.com',
    ossCompany: {
      name: 'MasterFabric',
      website: 'https://masterfabric.co',
      description: 'MasterFabric is a technology company focused on innovative mobile and web solutions. We specialize in building scalable applications using modern technologies like Flutter.',
      openSource: {
        title: 'MasterFabric Open Sourced Development',
        description: 'MasterFabric actively contributes to open source development, creating and maintaining various open-source projects including BaaS platforms, mobile frameworks, and developer tools.',
        projects: [
          'MasterFabric Platform - Self-hosted BaaS platform',
          'OSMEA - Mobile E-commerce Architecture Framework',
          'MasterFabric Welcome - Developer onboarding portal',
          'Developer Manifesto - Manifesto publishing platform',
          'MasterFabric Academy - Free volunteer education track with MCP curriculum'
        ]
      }
    }
  },
  about: {
    masterfabric: 'MasterFabric - AI-powered product development, education, open source first. Innovative mobile and web solutions with Flutter, BaaS platforms, and developer tools.',
    ticimax: 'Ticimax - One of Turkey\'s leading e-commerce platforms. 14,000+ companies. Omnichannel, B2B, marketplace integrations, 99.9% uptime cloud.'
  },
  repositories: [
    {
      name: 'gurkanfikretgunak',
      url: 'https://github.com/gurkanfikretgunak',
      description: 'Personal GitHub - Open source contributions and projects'
    },
    {
      name: 'masterfabric',
      url: 'https://github.com/masterfabric',
      description: 'Main MasterFabric repositories - Core platform and infrastructure'
    },
    {
      name: 'masterfabric-mobile',
      url: 'https://github.com/masterfabric-mobile',
      description: 'MasterFabric Mobile App - Flutter-based mobile application'
    },
    {
      name: 'one-hundered-days',
      url: 'https://github.com/masterfabric/one-hundered-days',
      description: 'MasterFabric Academy curriculum and education MCP'
    }
  ],
  skills: [
    'Flutter',
    'Dart',
    'Mobile Development',
    'AI',
    'Cloud (Azure, AWS)',
    'Project Planning',
    'High-Traffic Backend Architects',
    'Team Leadership',
    'Clean Architecture',
    'State Management',
    'CI/CD',
    'RESTful APIs',
    'Firebase',
    'Git',
    'Agile/Scrum'
  ],
  interests: [
    'Mobile App Development',
    'Flutter Ecosystem',
    'Software Architecture',
    'Team Leadership',
    'Open Source',
    'Innovative Solutions',
    'Cross-platform Development'
  ],
  contact: {
    github: 'https://github.com/gurkanfikretgunak',
    email: 'gurkangunak@ticimax.com',
    ossEmail: 'gurkanfikretgunak@masterfabric.co',
    company: 'Ticimax - https://ticimax.com',
    ossCompany: 'MasterFabric - https://masterfabric.co'
  },
  volunteer: [
    { title: 'SpaceXAI Ambassador', description: { en: 'Community program representing experienced developers worldwide. Documentation, events, hackathon/workshop organization, SpaceXAI workflow optimization support.', tr: 'SpaceXAI\'ın dünya çapında deneyimli geliştiricileri temsil eden topluluk programı. Dokümantasyon, etkinlikler, hackathon/workshop, SpaceXAI workflow optimizasyonu desteği.' } },
    {
      title: 'MasterFabric Academy',
      description: {
        en: 'Volunteer, free education track. Curriculum and education MCP live in the open-source repo; learners continue on the academy app to track progress and earn certificates.',
        tr: 'Gönüllü, ücretsiz eğitim akışı. Müfredat ve eğitim MCP açık kaynak deposunda; öğrenenler ilerlemeyi takip edip sertifika almak için academy uygulamasında devam edebilir.'
      },
      links: [
        { label: { en: 'Website', tr: 'Website' }, url: 'https://academy.masterfabric.co' },
        { label: { en: 'Curriculum / MCP', tr: 'Müfredat / MCP' }, url: 'https://github.com/masterfabric/one-hundered-days' },
        { label: { en: 'Certificates & Progress', tr: 'Sertifika ve İlerleme' }, url: 'https://academy-app.masterfabric.co' }
      ]
    }
  ]
};

function displayInfo() {
  const output = `
${chalk.bold.cyan('╔══════════════════════════════════════════╗')}
${chalk.bold.cyan('║')}  ${chalk.bold.white('GURKAN FIKRET GUNAK - Mobile Team Lead')}  ${chalk.bold.cyan('║')}
${chalk.bold.cyan('╚══════════════════════════════════════════╝')}

${chalk.bold('👤 ' + t.labels.name + ':')}        ${info.name}
${chalk.bold('💼 ' + t.labels.roles + ':')}       ${info.roles.map(r => chalk.green(r)).join(chalk.dim(' | '))}
${chalk.bold('🏢 ' + t.labels.company + ':')}     ${chalk.magenta(info.company.name)} - ${chalk.cyan(info.company.website)}
${chalk.bold('🌐 ' + t.labels.ossCompany + ':')}  ${chalk.magenta(info.company.ossCompany.name)} - ${chalk.cyan(info.company.ossCompany.website)}
${chalk.bold('📍 ' + t.labels.location + ':')}    ${t.location}
${chalk.bold('🔗 GitHub:')}      ${chalk.cyan(info.githubUrl)}

${chalk.bold('🏢 ' + t.labels.aboutMasterfabric + ':')}
   ${chalk.dim(t.about.masterfabric)}

${chalk.bold('🏢 ' + t.labels.aboutTicimax + ':')}
   ${chalk.dim(t.about.ticimax)}

${chalk.bold('🌐 ' + t.labels.openSource + ':')}
   ${chalk.dim(info.company.ossCompany.openSource.description)}
   ${chalk.dim(t.labels.runOpensource)}

${chalk.bold('📦 ' + t.labels.keyRepos + ':')}
${info.repositories.map(repo => `   ${chalk.green('•')} ${chalk.bold(repo.name)}`).join('\n')}
   ${chalk.dim(t.labels.runRepos)}

${chalk.bold('🤝 ' + t.labels.volunteer + ':')}
${info.volunteer.map(v => {
    const line = `   ${chalk.green('•')} ${chalk.bold(v.title)} - ${chalk.dim(v.description[lang])}`;
    const links = (v.links || []).map(l => {
      const label = typeof l.label === 'string' ? l.label : l.label[lang];
      return `     ${chalk.dim(label + ':')} ${chalk.cyan(l.url)}`;
    }).join('\n');
    return links ? `${line}\n${links}` : line;
  }).join('\n')}

${chalk.bold('🛠️  ' + t.labels.skills + ':')}
${t.skills.map(skill => `   • ${chalk.green(skill)}`).join('\n')}

${chalk.bold('🎯 ' + t.labels.interests + ':')}
${t.interests.map(interest => `   • ${chalk.yellow(interest)}`).join('\n')}

${chalk.bold('📧 ' + t.labels.contact + ':')}
   ${chalk.cyan('GitHub:')} ${info.contact.github}
   ${chalk.cyan('Email:')}  ${info.contact.email}
   ${chalk.cyan('OSS Email:')} ${info.contact.ossEmail}
   ${chalk.cyan(t.labels.company + ':')} ${info.contact.company}
   ${chalk.cyan(t.labels.ossCompany + ':')} ${info.contact.ossCompany}

${chalk.dim('───────────────────────────────────────────────────────────')}
${chalk.dim(t.labels.helpHint)}
`;

  console.log(boxen(output, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
    backgroundColor: '#1a1a1a'
  }));
}

function displayHelp() {
  const help = `
${chalk.bold.cyan('Gurkan CLI Tool - Help')}

${chalk.bold('Usage:')}
  npx gurkan [options]

${chalk.bold('Options:')}
  --help, -h           Show this help message
  --github, -g         Open GitHub profile
  --skills, -s         Show skills only
  --contact, -c        Show contact information only
  --repos, -r          Show repositories information
  --projects, -p        Show projects and repositories
  --masterfabric, -m   Show Masterfabric company information
  --opensource, -o     Show MasterFabric open source projects
  --version, -v        Show version number
  --tr, -tr            Turkish version

${chalk.bold('Examples:')}
  npx gurkan
  npx gurkan --skills
  npx gurkan --contact
  npx gurkan --github
  npx gurkan --repos
  npx gurkan --masterfabric
  npx gurkan --opensource
  npx gurkan -tr
`;
  console.log(help);
}

function displaySkills() {
  console.log(chalk.bold.cyan('\n🛠️  ' + t.labels.skills + ':\n'));
  t.skills.forEach(skill => {
    console.log(`   ${chalk.green('•')} ${chalk.green(skill)}`);
  });
  console.log('');
}

function displayContact() {
  console.log(chalk.bold.cyan('\n📧 Contact Information:\n'));
  console.log(`   ${chalk.bold('GitHub:')} ${chalk.cyan(info.contact.github)}`);
  console.log(`   ${chalk.bold('Email:')} ${chalk.yellow(info.contact.email)}`);
  console.log(`   ${chalk.bold('OSS Email:')} ${chalk.yellow(info.contact.ossEmail)}`);
  console.log(`   ${chalk.bold(t.labels.company + ':')} ${chalk.magenta(info.contact.company)}`);
  console.log(`   ${chalk.bold(t.labels.ossCompany + ':')} ${chalk.magenta(info.contact.ossCompany)}`);
  console.log('');
}

function displayRepositories() {
  console.log(chalk.bold.cyan('\n📦 Repositories:\n'));
  info.repositories.forEach(repo => {
    console.log(`   ${chalk.bold.green(repo.name)}`);
    console.log(`   ${chalk.dim('URL:')} ${chalk.cyan(repo.url)}`);
    console.log(`   ${chalk.dim('Description:')} ${chalk.yellow(repo.description)}`);
    console.log('');
  });
}

function displayMasterfabric() {
  const output = `
${chalk.bold.magenta('╔══════════════════════════════════════════════════════╗')}
${chalk.bold.magenta('║')}              ${chalk.bold.white('MASTERFABRIC')}              ${chalk.bold.magenta('║')}
${chalk.bold.magenta('╚══════════════════════════════════════════════════════╝')}

${chalk.bold('🏢 Company:')}     ${chalk.magenta(info.company.ossCompany.name)}
${chalk.bold('🌐 Website:')}      ${chalk.cyan(info.company.ossCompany.website)}
${chalk.bold('📧 OSS Email:')}   ${chalk.yellow(info.contact.ossEmail)}

${chalk.bold('📝 About:')}
   ${info.company.ossCompany.description}

${chalk.bold('👨‍💼 Team Lead:')}  ${info.name}
${chalk.bold('💼 Roles:')}       ${info.roles.map(r => chalk.green(r)).join(chalk.dim(' | '))}

${chalk.bold('🌐 Open Source Development:')}
   ${info.company.ossCompany.openSource.description}

${chalk.bold('📦 Key Projects:')}
${info.repositories.map(repo => 
  `   ${chalk.green('•')} ${chalk.bold(repo.name)} - ${chalk.dim(repo.description)}`
).join('\n')}

${chalk.bold('🛠️  Technologies:')}
   ${chalk.green('•')} Flutter & Dart
   ${chalk.green('•')} Mobile App Development
   ${chalk.green('•')} Cross-platform Solutions
   ${chalk.green('•')} Modern Web Technologies
   ${chalk.green('•')} Scalable Architecture
   ${chalk.green('•')} Open Source Contributions

${chalk.dim('───────────────────────────────────────────────────────────')}
${chalk.dim('Visit:')} ${chalk.cyan(info.company.ossCompany.website)}
${chalk.dim('Run --opensource for open source projects')}
`;

  console.log(boxen(output, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'magenta',
    backgroundColor: '#1a1a1a'
  }));
}

function displayOpenSource() {
  const output = `
${chalk.bold.green('╔══════════════════════════════════════════════════════╗')}
${chalk.bold.green('║')}      ${chalk.bold.white('MASTERFABRIC OPEN SOURCE')}      ${chalk.bold.green('║')}
${chalk.bold.green('╚══════════════════════════════════════════════════════╝')}

${chalk.bold('🌐 ' + info.company.ossCompany.openSource.title + ':')}
   ${info.company.ossCompany.openSource.description}

${chalk.bold('📦 Open Source Projects:')}
${info.company.ossCompany.openSource.projects.map(project => 
  `   ${chalk.green('•')} ${chalk.bold(project)}`
).join('\n')}

${chalk.bold('👨‍💼 Maintained by:')}  ${info.name}
${chalk.bold('💼 Roles:')}       ${info.roles.map(r => chalk.green(r)).join(chalk.dim(' | '))}

${chalk.bold('🔗 Explore More:')}
   ${chalk.cyan('GitHub:')} ${info.githubUrl}
   ${chalk.cyan('Company:')} ${info.company.ossCompany.website}

${chalk.dim('──────────────────────═════════════════════════════════════')}
${chalk.dim('All projects are open source and available on GitHub')}
`;

  console.log(boxen(output, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    backgroundColor: '#1a1a1a'
  }));
}

function openGitHub() {
  const { exec } = require('child_process');
  const platform = process.platform;
  let command;

  if (platform === 'darwin') {
    command = `open ${info.contact.github}`;
  } else if (platform === 'win32') {
    command = `start ${info.contact.github}`;
  } else {
    command = `xdg-open ${info.contact.github}`;
  }

  exec(command, (error) => {
    if (error) {
      console.log(chalk.cyan(`\nGitHub: ${info.contact.github}\n`));
    }
  });
}

// Parse command line arguments
if (args.includes('--help') || args.includes('-h')) {
  displayHelp();
} else if (args.includes('--skills') || args.includes('-s')) {
  displaySkills();
} else if (args.includes('--contact') || args.includes('-c')) {
  displayContact();
} else if (args.includes('--repos') || args.includes('-r') || args.includes('--projects') || args.includes('-p')) {
  displayRepositories();
} else if (args.includes('--masterfabric') || args.includes('-m')) {
  displayMasterfabric();
} else if (args.includes('--opensource') || args.includes('-o')) {
  displayOpenSource();
} else if (args.includes('--github') || args.includes('-g')) {
  openGitHub();
} else if (args.includes('--version') || args.includes('-v')) {
  const packageJson = require('../package.json');
  console.log(chalk.cyan(`\nv${packageJson.version}\n`));
} else {
  displayInfo();
}
