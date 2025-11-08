#!/usr/bin/env node

const chalk = require('chalk');
const boxen = require('boxen');

const info = {
  name: 'Gurkan Fikret Gunak',
  role: 'Mobile Team Lead',
  github: 'gurkanfikretgunak',
  githubUrl: 'https://github.com/gurkanfikretgunak',
  location: 'Turkey',
  skills: [
    'Flutter',
    'Dart',
    'Mobile Development',
    'Team Leadership',
    'Project Management',
    'Clean Architecture',
    'State Management',
    'CI/CD'
  ],
  interests: [
    'Mobile App Development',
    'Flutter Ecosystem',
    'Software Architecture',
    'Team Leadership',
    'Open Source'
  ],
  contact: {
    github: 'https://github.com/gurkanfikretgunak',
    email: 'gurkanfikretgunak@masterfabric.co'
  }
};

function displayInfo() {
  const output = `
${chalk.bold.cyan('╔════════════════════════════════════════╗')}
${chalk.bold.cyan('║')}   ${chalk.bold.white('GURKAN FIKRET GUNAK - Mobile Team Lead')}  ${chalk.bold.cyan('║')}
${chalk.bold.cyan('╚════════════════════════════════════════╝')}

${chalk.bold('👤 Name:')}        ${info.name}
${chalk.bold('💼 Role:')}        ${info.role}
${chalk.bold('📍 Location:')}    ${info.location}
${chalk.bold('🔗 GitHub:')}      ${chalk.cyan(info.githubUrl)}

${chalk.bold('🛠️  Skills:')}
${info.skills.map(skill => `   • ${chalk.green(skill)}`).join('\n')}

${chalk.bold('🎯 Interests:')}
${info.interests.map(interest => `   • ${chalk.yellow(interest)}`).join('\n')}

${chalk.bold('📧 Contact:')}
   ${chalk.cyan('GitHub:')} ${info.contact.github}
   ${chalk.cyan('Email:')}  ${info.contact.email}

${chalk.dim('────────────────────────────────────────')}
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
  --help, -h     Show this help message
  --github, -g   Open GitHub profile
  --skills, -s   Show skills only
  --contact, -c  Show contact information only
  --version, -v  Show version number

${chalk.bold('Examples:')}
  npx gurkan
  npx gurkan --skills
  npx gurkan --contact
  npx gurkan --github
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
  console.log('');
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
} else if (args.includes('--github') || args.includes('-g')) {
  openGitHub();
} else if (args.includes('--version') || args.includes('-v')) {
  const packageJson = require('../package.json');
  console.log(chalk.cyan(`\nv${packageJson.version}\n`));
} else {
  displayInfo();
}

