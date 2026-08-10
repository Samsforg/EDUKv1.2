#!/usr/bin/perl
use strict;
use warnings;
use re 'eval';
my $bal;
$bal = qr/\((?:[^()]|(??{ $bal }))*\)/;
while (<>) {
  s/\bawait ((?:query|queryOne|run)(?:<[^>]*>)?$bal)(\?\.|!\.|!\[|\.(?!then\b|catch\b|finally\b)[A-Za-z_][A-Za-z0-9_]*)/($1)$2/g;
  print;
}
