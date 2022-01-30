# Menon Labs x CommonLit: A Mobile Application for Millions of Users in Latin America

Last Progress Snapshot:\
![](Menon_Progress.gif)
 
Building from Scratch:\
npm install -g expo-cli
expo init AwesomeProject

Dependencies:\
yarn add @react-native-community/netinfo\
expo install expo-sqlite\


Basic Git\
git status\
git add .\
git commit -m "whatever text"\
git push\

//create new branch\
git branch\
git checkout -b "110820Branch" //creates new branch and switches to that branch\
git push --set-upstream origin 110820Branch\

//renaming Git Branch\
git checkout <old_name>\
git branch -m <new_name>\
git push origin -u <new_name>\
git push origin --delete <old_name>\

//removing files from the branch\
git rm <file_name>\

//reset local branch to origin\
git reset --hard origin/<branch_name>\

//delete and display all .DS_Store in current folder and subfolders\
find . -name ".DS_Store" -print -delete\

//delete the last commit from the repository\
//moves to previous commit and resets HEAD/Force Push to change\
git reset HEAD^ --hard\
git push -f\
