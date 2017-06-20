var gulp = require('gulp');
//gulp-load-plugins是把所有gulp开头的模块全部加载
var $ = require('gulp-load-plugins')();
var open = require('open');

//定义目录路径
var app = {
	srcPath:'src/',
	devPath:'build/',
	prdPath:'dist/'
};

//定义任务js文件处理
gulp.task('lib',function() {
	gulp.src('bower_components/**/*.js')
	.pipe(gulp.dest(app.devPath + 'vendor'))
	.pipe(gulp.dest(app.prdPath + 'vendor'))
	.pipe($.connect.reload());
});

//html文件处理
gulp.task('html',function() {
	gulp.src(app.srcPath + '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
});

//处理json文件模拟数据
gulp.task('json',function() {
	gulp.src(app.srcPath + 'data/**/*.json')
	.pipe(gulp.dest(app.devPath + 'data'))
	.pipe(gulp.dest(app.prdPath + 'data'))
	.pipe($.connect.reload());
})

//处理less文件
gulp.task('less', function() {
	gulp.src(app.srcPath + 'style/index.less')
	//读取完之后先转化为css文件
	.pipe($.less())
	.pipe(gulp.dest(app.devPath + 'css'))
	//上传文件压缩
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath + 'css'))
	//从新刷新页面
	.pipe($.connect.reload());
})

gulp.task('icon', function() {
	gulp.src(app.srcPath + 'icon/**/*')
	.pipe(gulp.dest(app.devPath + 'icon'))
	.pipe(gulp.dest(app.prdPath + 'icon'))
	.pipe($.connect.reload());
})


//处理js文件
gulp.task('js',function() {
	gulp.src(app.srcPath + 'script/**/*.js')
	//所有js合并成一个文件
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPath +'js'))
	//上传的文件要压缩
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath + 'js'))
	.pipe($.connect.reload());
});

//处理图片
gulp.task('image',function() {
	gulp.src(app.srcPath + 'image/**/*')
	.pipe(gulp.dest(app.devPath + 'image'))
	//上传的时候压缩
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath + 'image'))
	.pipe($.connect.reload());
})

//每次gulp先把dist和build文件删除
gulp.task('clean',function() {
	gulp.src([app.devPath,app.prdPath])
	.pipe($.clean());
});

//把所有的任务用一个任务代理
gulp.task('build',['lib','html','less','json','js','image','icon']);

//实施自动刷新
gulp.task('server',function() {
	$.connect.server({
		//加载那个文件
		root:[app.devPath],
		//自动刷新。ie8不支持
		livereload:true,
		//代理窗口
		port:8888
	});
	//自动打开网址
	open('http://localhost:8888');
	//watch监控个个原始文件的是否有变化，有变化就进行相应的task,修改相应的build和dest文件
	//但不会自动刷新浏览器，需要在每个任务后面加.pipe($.connect.reload())
	gulp.watch('bower_components/**/*.js',['lib']);
	gulp.watch(app.srcPath + '**/*.html',['html']);
	gulp.watch(app.srcPath + 'data/**/*.json',['json']);
	gulp.watch(app.srcPath + 'style/**/*.less',['less']);
	gulp.watch(app.srcPath + 'script/**/*.js',['js']);
	gulp.watch(app.srcPath + 'image/**/*',['image'])
})