const path = require('path');
// Плагин для копирования не только js кода, но и html, css...
const CopyPlugin = require('copy-webpack-plugin');

// Конфигурацию сборки
module.exports = {
  // Точка входа (главный модуль)
  entry: './src/main.js',
  // Выходные данные (что мы хотим на выходе)...
  output: {
    // ...файл, который называется bundle.js (файл сборки)...
    filename: 'bundle.js',
    // ...файл, который собран - положить в директорию build
    path: path.resolve(__dirname, 'build'),
    // ...перед тем как собирать, что то - почистили директорию build, (если она существует)
    clean: true,
  },
  // Включили карты исходников
  devtool: 'source-map',
  // Подключаем плагин
  plugins: [
    // Создаем экземпляр плагина
    new CopyPlugin({
      // скопировть всё из public и положить в build
      patterns: [{ from: 'public' }]
    }),
  ],
  module: {
    rules: [
      // Настройка babel (лоадер)
      {
        // Для всех файлорв js...
        test: /\.js$/,
        // ...кроме тех, которые приходят из папки node_modules
        exclude: /(node_modules)/,
        // ...нужно применять babel-loader
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
