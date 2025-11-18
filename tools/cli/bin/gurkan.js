#!/usr/bin/env node

const chalk = require('chalk');
const boxen = require('boxen');

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
    name: 'MasterFabric',
    website: 'https://masterfabric.co',
    description: 'MasterFabric is a technology company focused on innovative mobile and web solutions. We specialize in building scalable applications using modern technologies like Flutter, providing end-to-end development services from concept to deployment.',
    email: 'gurkanfikretgunak@masterfabric.co',
    openSource: {
      title: 'MasterFabric Open Sourced Development',
      description: 'MasterFabric actively contributes to open source development, creating and maintaining various open-source projects including BaaS platforms, mobile frameworks, and developer tools. Our open-source initiatives focus on building scalable, production-ready solutions for the developer community.',
      projects: [
        'MasterFabric Platform - Self-hosted BaaS platform',
        'OSMEA - Mobile E-commerce Architecture Framework',
        'MasterFabric Welcome - Developer onboarding portal',
        'Developer Manifesto - Manifesto publishing platform'
      ]
    }
  },
  repositories: [
    {
      name: 'masterfabric',
      url: 'https://github.com/masterfabric',
      description: 'Main MasterFabric repositories - Core platform and infrastructure'
    },
    {
      name: 'masterfabric-mobile',
      url: 'https://github.com/masterfabric-mobile',
      description: 'MasterFabric Mobile App - Flutter-based mobile application'
    }
  ],
  skills: [
    'Flutter',
    'Dart',
    'Mobile Development',
    'Team Leadership',
    'Project Management',
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
    email: 'gurkanfikretgunak@masterfabric.co',
    company: 'https://masterfabric.co'
  }
};

function displayInfo() {
  const output = `
${chalk.bold.cyan('╔══════════════════════════════════════════╗')}
${chalk.bold.cyan('║')}  ${chalk.bold.white('GURKAN FIKRET GUNAK - Mobile Team Lead')}  ${chalk.bold.cyan('║')}
${chalk.bold.cyan('╚══════════════════════════════════════════╝')}

${chalk.bold('👤 Name:')}        ${info.name}
${chalk.bold('💼 Roles:')}       ${info.roles.map(r => chalk.green(r)).join(chalk.dim(' | '))}
${chalk.bold('🏢 Company:')}     ${chalk.magenta(info.company.name)} - ${chalk.cyan(info.company.website)}
${chalk.bold('📍 Location:')}    ${info.location}
${chalk.bold('🔗 GitHub:')}      ${chalk.cyan(info.githubUrl)}

${chalk.bold('🏢 About Masterfabric:')}
   ${chalk.dim(info.company.description)}

${chalk.bold('🌐 Open Source Development:')}
   ${chalk.dim(info.company.openSource.description)}
   ${chalk.dim('Run --opensource for details')}

${chalk.bold('📦 Key Repositories:')}
${info.repositories.map(repo => `   ${chalk.green('•')} ${chalk.bold(repo.name)}`)
  .join('\n')}
   ${chalk.dim('Run --repos for details')}

${chalk.bold('🛠️  Skills:')}
${info.skills.map(skill => `   • ${chalk.green(skill)}`).join('\n')}

${chalk.bold('🎯 Interests:')}
${info.interests.map(interest => `   • ${chalk.yellow(interest)}`).join('\n')}

${chalk.bold('📧 Contact:')}
   ${chalk.cyan('GitHub:')} ${info.contact.github}
   ${chalk.cyan('Email:')}  ${info.contact.email}
   ${chalk.cyan('Company:')} ${info.contact.company}

${chalk.dim('───────────────────────────────────────────────────────────')}
${chalk.dim('Run with --help for more options')}
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

${chalk.bold('Examples:')}
  npx gurkan
  npx gurkan --skills
  npx gurkan --contact
  npx gurkan --github
  npx gurkan --repos
  npx gurkan --masterfabric
  npx gurkan --opensource
`;
  console.log(help);
}

function displaySkills() {
  console.log(chalk.bold.cyan('\n🛠️  Skills:\n'));
  info.skills.forEach(skill => {
    console.log(`   ${chalk.green('•')} ${chalk.green(skill)}`);
  });
  console.log('');
}

function displayContact() {
  console.log(chalk.bold.cyan('\n📧 Contact Information:\n'));
  console.log(`   ${chalk.bold('GitHub:')} ${chalk.cyan(info.contact.github)}`);
  console.log(`   ${chalk.bold('Email:')}  ${chalk.yellow(info.contact.email)}`);
  console.log(`   ${chalk.bold('Company:')} ${chalk.magenta(info.contact.company)}`);
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
${chalk.bold.magenta('╔═══════════════════════════════════════════════════════╗')}
${chalk.bold.magenta('║')}              ${chalk.bold.white('MASTERFABRIC')}              ${chalk.bold.magenta('║')}
${chalk.bold.magenta('╚═══════════════════════════════════════════════════════╝')}

${chalk.bold('🏢 Company:')}     ${chalk.magenta(info.company.name)}
${chalk.bold('🌐 Website:')}      ${chalk.cyan(info.company.website)}
${chalk.bold('📧 Email:')}       ${chalk.yellow(info.contact.email)}

${chalk.bold('📝 About:')}
   ${info.company.description}

${chalk.bold('👨‍💼 Team Lead:')}  ${info.name}
${chalk.bold('💼 Roles:')}       ${info.roles.map(r => chalk.green(r)).join(chalk.dim(' | '))}

${chalk.bold('🌐 Open Source Development:')}
   ${info.company.openSource.description}

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
${chalk.dim('Visit:')} ${chalk.cyan(info.company.website)}
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
${chalk.bold.green('╔═══════════════════════════════════════════════════════╗')}
${chalk.bold.green('║')}      ${chalk.bold.white('MASTERFABRIC OPEN SOURCE')}      ${chalk.bold.green('║')}
${chalk.bold.green('╚═══════════════════════════════════════════════════════╝')}

${chalk.bold('🌐 ' + info.company.openSource.title + ':')}
   ${info.company.openSource.description}

${chalk.bold('📦 Open Source Projects:')}
${info.company.openSource.projects.map(project => 
  `   ${chalk.green('•')} ${chalk.bold(project)}`
).join('\n')}

${chalk.bold('👨‍💼 Maintained by:')}  ${info.name}
${chalk.bold('💼 Roles:')}       ${info.roles.map(r => chalk.green(r)).join(chalk.dim(' | '))}

${chalk.bold('🔗 Explore More:')}
   ${chalk.cyan('GitHub:')} ${info.githubUrl}
   ${chalk.cyan('Company:')} ${info.company.website}

${chalk.dim('───────────────────────────────────────────────────────────')}
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
const args = process.argv.slice(2);

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

