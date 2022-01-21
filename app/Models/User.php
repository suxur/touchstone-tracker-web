<?php

namespace App\Models;

use App\Traits\HasCharacters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Jetstream\HasTeams;
use Laravel\Sanctum\HasApiTokens;
use function is_null;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use HasTeams;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use HasCharacters;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'email_verified_at',
        'password',
        'profile_photo_path',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url',
    ];

    protected $with = [
        'teams',
        'ownedTeams'
    ];

    public function encounters()
    {
        return $this->hasMany(Encounter::class);
    }

    public function statBlocks()
    {
        return $this->hasMany(StatBlock::class);
    }

    /**
     * Remove the given user from the team.
     *
     * @param StatBlock $statBlock
     * @return void
     */
    public function removeStatBlock(StatBlock $statBlock)
    {
        $statBlock->delete();
    }

    /**
     * Determine if the user owns the given character.
     *
     * @param mixed $statBlock
     * @return bool
     */
    public function ownsStatBlock($statBlock): bool
    {
        if (is_null($statBlock)) {
            return false;
        }

        return $this->id === $statBlock->{$this->getForeignKey()};
    }

    public function characters()
    {
        return $this->statBlocks()->where('stat_block_type', 'character')->get();
    }

    public function monsters()
    {
        return $this->statBlocks()->where('stat_block_type', 'monster')->get();
    }
}
