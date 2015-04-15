@rem 通过bower.json自动生成requirejs的config依赖
cd %~dp0
cd ../
"%~dp0\node_modules\.bin\bower-requirejs" -c src/home/config2.generate.js -t -d -b .
