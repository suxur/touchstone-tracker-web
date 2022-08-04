<?php

$config = new PhpCsFixer\Config();

return $config->setRules([
    '@PSR12'                 => true,
    '@Symfony'               => true,
    'array_syntax'           => ['syntax' => 'short'],
    'binary_operator_spaces' => ['operators' => [
        '=>' => 'align'
    ]],
]);
