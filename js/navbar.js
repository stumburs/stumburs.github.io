document.write('<ul class="nav nav-pills justify-content-center">');

    // Home
    document.write('<li class="nav-item">');
        document.write('<a class="nav-link" href="/index">Home</a>');
    document.write('</li>');

    // Projects
    document.write('<li class="nav-item">');
        document.write('<a class="nav-link" href="/projects">Projects</a>');
    document.write('</li>');

    // Dropdown
    document.write('<li class="nav-item dropdown">');
        document.write('<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Other</a>');
        document.write('<ul class="dropdown-menu">');
            document.write('<li><a class="dropdown-item" href="/other/snippets">Code snippets</a></li>');
            document.write('<div class="dropdown-divider"></div>');
            document.write('<li><a class="dropdown-item">Nothing</a></li>');
            document.write('<li><a class="dropdown-item">Also nothing</a></li>');
            document.write('<li><a class="dropdown-item">Literally nothing</a></li>');
        document.write('</ul>');
    document.write('</li>');

    // About
    document.write('<li class="nav-item">');
        document.write('<a class="nav-link" href="/about">About</a>');
    document.write('</li>');

document.write('</ul>');
