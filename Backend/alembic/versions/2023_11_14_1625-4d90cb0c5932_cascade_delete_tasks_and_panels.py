"""Cascade delete tasks and panels

Revision ID: 4d90cb0c5932
Revises: f9e8644bd92e
Create Date: 2023-11-14 16:25:30.379186

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4d90cb0c5932'
down_revision: Union[str, None] = 'f9e8644bd92e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
