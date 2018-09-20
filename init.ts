/**
 * This script runs automatically after your first npm-install.
 *
 * Heavily inspired by https://github.com/alexjoverm/typescript-library-starter
 */
import * as _prompt from 'prompt';
import * as colors from 'colors';
import { mv, rm, which, exec } from 'shelljs';
import replace from 'replace-in-file';
import { basename, resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { fork } from 'child_process';

// Note: These should all be relative to the project root directory
const rmDirs = [
  '.git'
];
const rmFiles = [
  '.all-contributorsrc',
  '.gitattributes',
  'init.ts'
];
const modifyFiles = [
  'LICENSE',
  'package.json'
];

const _promptSchemaApplicationName = {
  properties: {
    application: {
      description: colors.cyan(
        'What do you want the application to be called? (use kebab-case)'
      ),
      pattern: /^[a-z]+(\-[a-z]+)*$/,
      type: 'string',
      required: true,
      message:
        '"kebab-case" uses lowercase letters, and hyphens for any punctuation'
    }
  }
};

const _promptSchemaRepoName = {
  properties: {
    repository: {
      description: colors.cyan(
        'What shall be your remote repository? (provide https or ssh url or leave empty if not needed)'
      ),
      pattern: /^((https:\/\/|git@)\w+\.\w+\/.*\.git)?$/,
      type: 'string',
      required: true,
      message:
        'provide empty string or https/ssh repository url'
    }
  }
};

const _promptSchemaApplicationSuggest = {
  properties: {
    useSuggestedName: {
      description: colors.cyan(
        'Would you like it to be called "' +
          applicationNameSuggested() +
          '"? [Yes/No]'
      ),
      pattern: /^(y(es)?|n(o)?)$/i,
      type: 'string',
      required: true,
      message: 'You need to type "Yes" or "No" to continue...'
    }
  }
};

_prompt.start();
_prompt.message = '';

// Clear console
process.stdout.write('\x1B[2J\x1B[0f');

if (!which('git')) {
  console.log(colors.red('Sorry, this script requires git'));
  removeItems();
  process.exit(1);
}

// Say hi!
console.log(
  colors.cyan('Hi! You\'re almost ready to set up your TypeScript application!')
);

// Generate the application name and start the tasks
if (process.env.CI == null) {
  if (!applicationNameSuggestedIsDefault()) {
    applicationNameSuggestedAccept();
  } else {
    applicationNameCreate();
  }
} else {
  // This is being run in a CI environment, so don't ask any questions
  setupApplication(applicationNameSuggested(), '');
}



/**
 * Asks the user for the name of the application if it has been cloned into the
 * default directory, or if they want a different name to the one suggested
 */
function applicationNameCreate() {
  _prompt.get(_promptSchemaApplicationName, (err: any, res: any) => {
    if (err) {
      console.log(colors.red('Sorry, there was an error building the workspace :('));
      removeItems();
      process.exit(1);

      return;
    }
    _prompt.get(_promptSchemaRepoName, (repoErr: any, repoRes: any) => {
      if (repoErr) {
        console.log(colors.red('Sorry, there was an error building the workspace :('));
        removeItems();
        process.exit(1);

        return;
      }

      setupApplication(res.application, repoRes.repository);
    });
  });
}

/**
 * Sees if the users wants to accept the suggested application name if the project
 * has been cloned into a custom directory (i.e. it's not 'mantha')
 */
function applicationNameSuggestedAccept() {
  _prompt.get(_promptSchemaApplicationSuggest, (err: any, res: any) => {
    if (err) {
      console.log(colors.red('Sorry, you\'ll need to type the application name'));
      applicationNameCreate();
    }

    if (res.useSuggestedName.toLowerCase().charAt(0) === 'y') {
      _prompt.get(_promptSchemaRepoName, (repoErr: any, repoRes: any) => {
        if (repoErr) {
          console.log(colors.red('Sorry, there was an error building the workspace :('));
          removeItems();
          process.exit(1);

          return;
        }

        setupApplication(applicationNameSuggested(), repoRes.repository);
      });
    } else {
      applicationNameCreate();
    }
  });
}

/**
 * The application name is suggested by looking at the directory name of the
 * root directory and converting it to kebab-case
 *
 * The regex for this looks for any non-word or non-digit character, or
 * an underscore (as it's a word character), and replaces it with a dash.
 * Any leading or trailing dashes are then removed, before the string is
 * lowercased and returned
 */
function applicationNameSuggested() {
  return basename(resolve(__dirname))
    .replace(/[^\w\d]|_/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/**
 * Checks if the suggested application name is the default, which is 'mantha'
 */
function applicationNameSuggestedIsDefault() {
  if (applicationNameSuggested() === 'mantha') {
    return true;
  }

  return false;
}



/**
 * Calls all of the functions needed to setup the application
 */
function setupApplication(applicationName: string, repo: string) {
  console.log(
    colors.cyan(
      '\nThanks for the info. The last few changes are being made... hang tight!\n\n'
    )
  );

  // Get the Git username and email before the .git directory is removed
  let username = exec('git config user.name').stdout.trim();
  let usermail = exec('git config user.email').stdout.trim();

  removeItems();

  modifyContents(applicationName, username, usermail, repo);

  // renameItems(applicationName);

  finalize();

  console.log(colors.cyan('OK, you\'re all set. Happy coding!! ;)\n'));
}

/**
 * Removes items from the project that aren't needed after the initial setup
 */
function removeItems() {
  console.log(colors.underline.white('Removed'));

  // The directories and files are combined here, to simplify the function,
  // as the 'rm' command checks the item type before attempting to remove it
  let rmItems = rmDirs.concat(rmFiles);
  rm('-rf', rmItems.map(f => resolve(__dirname, f)));
  console.log(colors.red(rmItems.join('\n')));

  console.log('\n');
}

/**
 * Updates the contents of the template files with the application name or user details
 */
function modifyContents(applicationName: string, username: string, usermail: string, repo: string) {
  console.log(colors.underline.white('Modified'));

  let files = modifyFiles.map(f => resolve(__dirname, f));
  try {
    const changes = replace.sync({
      files,
      from: [/--application-name--/g, /--username--/g, /--usermail--/g],
      to: [applicationName, username, usermail]
    });
    console.log(colors.yellow(modifyFiles.join('\n')));
  } catch (error) {
    console.error('An error occurred modifying the file: ', error);
  }

  console.log('\n');
}

// /**
//  * Renames any template files to the new application name
//  */
// function renameItems(applicationName: string) {
//   console.log(colors.underline.white('Renamed'));

//   renameFiles.forEach(function (files) {
//     // Files[0] is the current filename
//     // Files[1] is the new name
//     let newFilename = files[1].replace(/--application-name--/g, applicationName);
//     mv(
//       resolve(__dirname, files[0]),
//       resolve(__dirname, newFilename)
//     );
//     console.log(colors.cyan(files[0] + ' => ' + newFilename));
//   });

//   console.log('\n');
// }

/**
 * Calls any external programs to finish setting up the application
 */
function finalize() {
  console.log(colors.underline.white('Finalizing'));

  // Recreate Git folder
  let gitInitOutput = exec('git init "' + resolve(__dirname,) + '"', {
    silent: true
  }).stdout;
  console.log(colors.green(gitInitOutput.replace(/(\n|\r)+/g, '')));

  // Remove post-install command
  let jsonPackage = resolve(__dirname, 'package.json');
  const pkg = JSON.parse(readFileSync(jsonPackage) as any);

  // Note: Add items to remove from the package file here
  delete pkg.scripts.postinstall;

  // Remove redundant packages
  delete pkg.devDependencies.prompt;
  delete pkg.devDependencies.shelljs;
  delete pkg.devDependencies['replace-in-file'];

  // tslint:disable-next-line:no-magic-numbers
  writeFileSync(jsonPackage, JSON.stringify(pkg, null, 2));
  console.log(colors.green('Postinstall script has been removed'));

  // Initialize Husky
  // fork(
  //   path.resolve(__dirname, '..', 'node_modules', 'husky', 'bin', 'install'),
  //   { silent: true }
  // );
  // console.log(colors.green('Git hooks set up'));

  console.log('\n');
}
