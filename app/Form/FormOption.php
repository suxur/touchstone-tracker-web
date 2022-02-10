<?php

namespace App\Form;

use Illuminate\Support\Collection;

class FormOption
{
    private string $type;
    private $field;
    private $default;
    private $key;

    private Collection $options;

    public function __construct($field, $option)
    {
        $this->options = collect(explode('|', $option));
        $this->type = $this->options->first();
        $this->field = $this->getValueOf('field');
        $this->default = $this->getValueOf('default');
        $this->key = $this->getValueOf('key') ?? $field;
    }

    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @return int|string|null
     */
    public function getField()
    {
        return $this->field;
    }

    /**
     * @return int|string|null
     */
    public function getDefault()
    {
        return $this->default;
    }

    /**
     * @return int|string
     */
    public function getKey()
    {
        return $this->key;
    }

    public function toArray(): array
    {
        return [
            'type'    => $this->type,
            'key'     => $this->key,
            'default' => $this->default,
            'field'   => $this->field,
        ];
    }

    private function getValueOf($key)
    {
        $index = $this->findIndexOf($key);

        if ($index < 0) return null;

        if ($values = explode(':', $this->options[$index])) {
            if (isset($values[2]) && $values[2] === 'int') {
                return (int)$values[1];
            }

            return $values[1] ?? null;
        }

        return null;
    }

    private function findIndexOf($key)
    {
        return $this->options->search(function ($option) use ($key) {
            return str_contains($option, $key);
        });
    }

}
