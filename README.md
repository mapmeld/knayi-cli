# knayi-cli

Simple command-line tool to replace Zawgyi-formatted text files with proper
Unicode text.

Also fixes some official datasets using Unicode diacritics in a non-standard
order, using the my-diacritic-sort module.

Automatically detects if your file is already in Unicode format.

CLI wrapper for Thuya Myo Nyunt's <a href="https://github.com/greenlikeorange/knayi-myscript">knayi-myscript</a> project.

## Usage

```
npm install knayi-cli -g
knayi-cli sample.txt
knayi-cli sample.txt output.txt
```

## License

Open sourced under the MIT license (same as original repo)
