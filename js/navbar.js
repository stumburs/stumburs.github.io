document.write('<ul class="nav nav-pills justify-content-center">');
    document.write('<li class="nav-item">');
        document.write('<a class="nav-link" href="/index">Home</a>');
    document.write('</li>');

    document.write('<li class="nav-item dropdown">');
        document.write('<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Fun Things</a>');
        document.write('<ul class="dropdown-menu">');
            document.write('<li><a class="dropdown-item" href="/fun/nice">Nice</a></li>');
            document.write('<div class="dropdown-divider"></div>');
            document.write('<li><a class="dropdown-item" href="#">Nothing</a></li>');
            document.write('<li><a class="dropdown-item" href="#">Also nothing</a></li>');
            document.write('<li><a class="dropdown-item" href="#">Literally nothing</a></li>');
        document.write('</ul>');
    document.write('</li>');

    document.write('<li class="nav-item">');
        document.write('<a class="nav-link" href="/about">About</a>');
    document.write('</li>');

document.write('</ul>');
